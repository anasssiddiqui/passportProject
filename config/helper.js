/* const bcrypt = require('bcrypt'); */
const config = require('./config');
const contant = require('../constant');
const crypto = require('crypto');
const path = require('path');
const db = require('../models');
const users = db.users
var uuid = require('uuid');
var FCM = require('fcm-node');
const express = require('express');

const app = express();

const fileExtension = require('file-extension')
const sharp = require('sharp') //for image thumbnail
const Thumbler = require('thumbler'); //for video thumbnail
let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('../swagger.json');

const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();
// const userapi = require('../controller/api_controller');
// app.use('/imageUplaod', multipartMiddleware);
// app.post('/imageUplaod', userapi.imageUplaod);

module.exports = {
    send_push_notification_message: function(message, tokken, userBy, pushType) {
        if (tokken != '') {
            var new_message = {
                to: tokken,
                // collapse_key: 'your_collapse_key',

                /* notification: {
              title: title,
              body: get_message
            },
         */
                data: {
                    title: "Blewglobal",
                    message: message,
                    pushType: pushType,
                    body: {
                        userBy,
                    }
                }
            };
            var serverKey = 'AAAAUDbJ4Vw:APA91bEosz_eg2Zgz1AbQ825iGOcRgPi2OrRQ_u3Kew-72obP5A-Y4jB3JpLE8yHLDxH-ccRTpVBSZyKpsa88y4dU3IpdJqBiZs4EZBfIgAkczgwxtaSAtc48l7q0EVa5ksnVl_D380U';
            var fcm = new FCM(serverKey);

            fcm.send(new_message, function(err, response) {
                if (err) {
                    console.log(err, "Something has gone wrong!");
                    console.log(new_message, "new_message");
                } else {
                    console.log(response, new_message, "new_message");
                    console.log("Successfully sent with response: ", response);
                }
            });

        }

    },
    fileUpload: async function(FILE, FOLDER, FILE_TYPE) {
        try {
            var FILENAME = FILE.name; // actual filename of file
            var FILEPATH = FILE.path; // will be put into a temp directory
            console.log(FILEPATH, "================FILEPATH")
            THUMBNAIL_IMAGE_SIZE = 300
            THUMBNAIL_IMAGE_QUALITY = 100

            let EXT = fileExtension(FILENAME); //get extension
            EXT = EXT ? EXT : 'jpg';
            FOLDER_PATH = FOLDER ? (FOLDER + "/") : ""; // if folder name then add following "/" 
            var ORIGINAL_FILE_UPLOAD_PATH = "/public/app-assets/images/" + FOLDER_PATH;
            var THUMBNAIL_FILE_UPLOAD_PATH = "/uploads/" + FOLDER_PATH;
            var NEW_FILE_NAME = (new Date()).getTime() + "-" + "file." + EXT;
            var NEW_THUMBNAIL_NAME = (new Date()).getTime() + "-" + "thumbnail" + "-" + "file." + ((FILE_TYPE == "video") ? "jpg" : EXT);

            let NEWPATH = path.join(__dirname, '../', ORIGINAL_FILE_UPLOAD_PATH, NEW_FILE_NAME);
            console.log(NEWPATH, "=======NEWPATH ---------------- ", __dirname)
            console.log(ORIGINAL_FILE_UPLOAD_PATH, "=======ORIGINAL_FILE_UPLOAD_PATH")
            console.log(NEW_THUMBNAIL_NAME, "=======NEW_THUMBNAIL_NAME")
            let THUMBNAIL_PATH = path.join(__dirname, '../', ORIGINAL_FILE_UPLOAD_PATH, NEW_THUMBNAIL_NAME);

            let FILE_OBJECT = {
                "image": '',
                "thumbnail": '',
                "fileName": FILENAME,
                "folder": FOLDER,
                "file_type": FILE_TYPE
            }
            console.log("NEWPATH ============ ", NEWPATH)

            let BUFFER = await this.readFile(FILEPATH); //read file from temp path
            await this.writeFile(NEWPATH, BUFFER); //write file to destination

            FILE_OBJECT.image = THUMBNAIL_FILE_UPLOAD_PATH + NEW_FILE_NAME;

            let THUMB_BUFFER = "";

            if (FILE_TYPE == 'image') { // image thumbnail code
                var THUMB_IMAGE_TYPE = (EXT == "png") ? "png" : "jpeg";
                THUMB_BUFFER = await sharp(BUFFER)
                    .resize(THUMBNAIL_IMAGE_SIZE)
                    .toFormat(THUMB_IMAGE_TYPE, { quality: THUMBNAIL_IMAGE_QUALITY })
                    .toBuffer();

                FILE_OBJECT.thumbnail = THUMBNAIL_FILE_UPLOAD_PATH + NEW_THUMBNAIL_NAME;
                await this.writeFile(THUMBNAIL_PATH, THUMB_BUFFER);
            } else if (FILE_TYPE == "video") { // video thumbnail code
                await this.createVideoThumb(NEWPATH, THUMBNAIL_PATH, NEW_THUMBNAIL_NAME);
                FILE_OBJECT.thumbnail = THUMBNAIL_FILE_UPLOAD_PATH + NEW_THUMBNAIL_NAME;
            }
            return FILE_OBJECT;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    passwordReset_email: function(otp, data, resu) {

        try {
            const nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                service: 'gmail',
                auth: {
                    user: '',
                    pass: ''
                }
            });
            console.log(data.dataValues.email, "======================")
            var mailOptions = {
                from: '',
                to: data.dataValues.email,
                subject: 'BLEWGLOBAL: Forgot password',
                html: 'Click here for change password <a href="http://202.164.42.227:3112/api/url_id/' + otp + '"> Click</a>'
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    res.send('Email send');
                }
            });
            return resu;
        } catch (err) {
            throw err;
        }
    },
    readFile: async(path) => {
        console.log("  ************ readFile *******************")
        return new Promise((resolve, reject) => {
            const readFile = util.promisify(fs.readFile);
            readFile(path).then((buffer) => {
                resolve(buffer);
            }).catch((error) => {
                reject(error);
            });
        });
    },

    writeFile: async(path, buffer) => {
        console.log("  ************ write file *******************", path)
        return new Promise((resolve, reject) => {
            const writeFile1 = util.promisify(fs.writeFile);
            writeFile1(path, buffer).then((buffer) => {
                resolve(buffer);
            }).catch((error) => {
                reject(error);
            });
        });
    },
    userdetail: async function(userid) {

        try {
            const data = await users.findOne({
                attributes: [`id`, `username`, `profileImage`, 'uniqueName', `phone`, `email`, `description`,
                    `lat`, `lng`, `loginType`, `authKey`, `deviceType`, 'notificationStatus',
                ],
                where: {
                    id: userid,
                }
            });
            return data;
        } catch (err) {
            throw err;
        }
    },

    vaildObject: async function(required, non_required, res) {
        let message = '';
        let empty = [];
        let table_name = (required.hasOwnProperty('table_name')) ? required.table_name : 'users';

        for (let key in required) {
            if (required.hasOwnProperty(key)) {
                if (required[key] == undefined || required[key] == '') {
                    empty.push(key);
                }
            }
        }

        if (empty.length != 0) {
            message = empty.toString();
            if (empty.length > 1) {
                message += " fields are required"
            } else {
                message += " field is required"
            }
            res.status(400).json({
                'success': false,
                'msg': message,
                'code': 400,
                'body': {}
            });
            return;
        } else {
            if (required.hasOwnProperty('security_key')) {
                if (required.security_key != "blewglobal123") {
                    message = "Invalid security key";
                    res.status(403).json({
                        'success': false,
                        'msg': message,
                        'code': 403,
                        'body': []
                    });
                    res.end();
                    return false;
                }
            }
            if (required.hasOwnProperty('password')) {
                // const saltRounds = 10;
                // var myPromise = await new Promise(function (resolve, reject) {
                //     bcrypt.hash(required.password, saltRounds, function (err, hash) {
                //         if (!err) {

                //             resolve(hash);
                //         } else {
                //             reject('0');
                //         }
                //     });
                // });
                // // required.password= crypto.createHash('sha1').update(required.password).digest('hex');
                // required.password = myPromise;
                // required.password = await this.getBcryptHash(required.password);
            }

            /* if (required.hasOwnProperty('checkexit')) {
                if (required.checkexit === 1) {
                    if (required.hasOwnProperty('email')) {
                        required.email = required.email.toLowerCase();

                        if (await this.checking_availability(required.email, 'email', table_name)) {
                            message = "this email is already register kindly use another";
                            res.status(403).json({
                                'success': false,
                                'message': message,
                                'code': 403,
                                'body': []
                            });
                            res.end();
                            return false;
                        }
                    }
                    if (required.hasOwnProperty('name') && required.name != undefined) {
                        required.name = required.name.toLowerCase();

                        if (await this.checking_availability(required.name, 'name', table_name)) {
                            message = "name is already in use";
                            res.status(403).json({
                                'success': false,
                                'message': message,
                                'code': 403,
                                'body': []
                            });
                            return false;
                        }
                    }

                }
            }


            if (non_required.hasOwnProperty('name') && non_required.name != undefined) {
                non_required.name = non_required.name.toLowerCase();

                if (await this.checking_availability(non_required.name, 'name', table_name)) {
                    message = "name is already in use";
                    res.status(403).json({
                        'success': false,
                        'message': message,
                        'code': 403,
                        'body': []
                    });
                    return false;
                }
            } */

            const marge_object = Object.assign(required, non_required);
            delete marge_object.checkexit;

            for (let data in marge_object) {
                if (marge_object[data] == undefined) {
                    delete marge_object[data];
                } else {
                    if (typeof marge_object[data] == 'string') {
                        marge_object[data] = marge_object[data].trim();
                    }
                }
            }

            return marge_object;
        }
    },

    error: function(res, err) {
        console.log(err);
        console.log('error');

        let code = (typeof err === 'object') ? ((err.statusCode) ? err.statusCode : ((err.code) ? err.code : 403)) : 403;
        let message = (typeof err === 'object') ? (err.message) : err;
        res.status(code).json({
            'success': false,
            'error_message': message,
            'code': code,
            'body': []
        });
    },



    sendMail: function(object) {
        const nodemailer = require('nodemailer');
        var transporter = nodemailer.createTransport('gmail', contant.mail_auth);

        var mailOptions = object;
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                //console.log(info); 
                console.log('Email sent: ' + info.messageId);
            }
        });
    },



    send_emails: function(message, find_users) {
        console.log(find_users, "==========", message, '========');

        try {
            const nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: '',
                    pass: ''
                }
            });
            console.log(find_users, '----------------');

            var mailOptions = {
                from: '',
                to: find_users,
                subject: 'SoleFinder',
                html: '<h4>' + message + '<h4>'
            };
            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(info);
                    res.send('Email send');
                }
            });
            return;
        } catch (err) {
            throw err;
        }
    },

    new_image_Upload(image) {
        if (image) {

            var extension = path.extname(image.name);

            var filename = Math.round(new Date().getTime()) + extension;
            var sampleFile = image;
            //console.log(filename, "==========filename");

            sampleFile.mv(process.cwd() + '/public/app-assets/images/users/' + filename, (err) => {
                if (err) throw err;
            });

            return filename;
        }
    },

}