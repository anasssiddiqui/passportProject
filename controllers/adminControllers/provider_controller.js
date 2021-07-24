const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const users = db.users
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
var exams = db.exams
var payments = db.payments
const categorys = db.categorys

module.exports = {
    editprovider: async function(req, res) {
        const categorys_find = await categorys.findAll({

        });
        var users_data = await users.findOne({
            where: {
                id: req.query.id
            },
        });
        res.render('admin/editprovider', {
            users_data: users_data,
            categorys_find: categorys_find,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'provider'
        });
    },
    addprovider: async function(req, res) {

        const categorys_find = await categorys.findAll({

        });
        res.render('admin/addprovider', { sessiondata: req.session, categorys_find: categorys_find, msg: req.flash('msg'), error: req.flash('error'), title: 'provider' });
    },
    createprovider: async function(req, res) {

        console.log(req.body)
        image_name = "";
        image_skill = "";

        const count = await users.count({
            where: {
                email: req.body.email,
            }
        });
        if (count > 0) {
            req.flash('error', 'Email Already Exist');
            res.redirect('/addprovider');
            return;
        }
        if (req.files && req.files.image) {

            let image = req.files.image;
            var extension = path.extname(image.name);
            var fileimage = uuid() + extension;
            image.mv(process.cwd() + '/public/app-assets/images/users/' + fileimage, function(err) {
                if (err)
                    return res.status(500).send(err);
            });
            image_name = fileimage;
        }

        if (req.files && req.files.skillandqualification) {

            let image = req.files.skillandqualification;
            var extension = path.extname(image.name);
            var fileimage = uuid() + extension;
            image.mv(process.cwd() + '/public/app-assets/images/users/' + fileimage, function(err) {
                if (err)
                    return res.status(500).send(err);
            });
            image_skill = fileimage;
        }
        const user_password = crypto.createHash('sha1').update(req.body.password).digest('hex');
        var auth_create = crypto.randomBytes(20).toString('hex');
        const adduser = await users.create({
            username: req.body.username,
            profileImage: image_name,
            phone: req.body.phone,
            email: req.body.email,
            password: user_password,
            lat: req.body.lat,
            lng: req.body.lng,
            authKey: auth_create,
            userType: 2,
            address: req.body.location,
            lat: req.body.lat,
            lng: req.body.lng,
            whychooseme: req.body.whychooseme,
            whyLoveThis: req.body.whyLoveThis,
            serviceCategory: req.body.serviceCategory,
            acceptedPettype: req.body.acceptedPettype,
            levelofSupervision: req.body.levelofSupervision,
            numberofwalksPerday: req.body.numberofwalksPerday,
            accesstoOutdorr: req.body.accesstoOutdorr,
            typeofHome: req.body.typeofHome,
            emergencyTransport: req.body.emergencyTransport,
            distanceWillingtravel: req.body.distanceWillingtravel,
            skillandqualification: image_skill
        });
        if (adduser) {
            req.flash('msg', 'Provider Successfully Added');
            res.redirect('/providerlist');
        } else {
            console.log(error)
        }
    },
    providerlist: async function(req, res) {
        var users_data = await users.findAll({
            where: {
                userType: 2
            },
            order: [
                ['id', 'DESC'],
            ],
        });
        users_data = users_data.map(value => {
            return value.toJSON();
        });
        res.render('admin/providerlist', { sessiondata: req.session, response: users_data, msg: req.flash('msg'), error: req.flash('error'), title: 'provider' });

    },
    users_statuschange: async function(req, res) {
        let update = await users.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status = await users.count({
            where: {
                id: req.body.id,
                status: 1,
            }
        });
        // console.log(status, "=============================================count")
        if (status == 1) {
            res.json(1);
        } else {
            res.json(2);
        }
    },
    deleteuser: async function(req, res) {

        const dlt = await users.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },
    viewprovider: async function(req, res) {
        var users_data = await users.findOne({
            where: {
                id: req.query.id
            },
        });

        var Payments_data = await payments.findAll({
            where: {
                userId: req.query.id
            },
        });



        var response = {
            Payments_data: Payments_data,
        }

        // console.log(response.exams_data, "=========");
        // return
        res.render('admin/viewprovider', {
            users_data: users_data,
            response: response,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'provider'
        });
    },
    update_provider: async function(req, res) {
        const count_email = await users.findOne({
            where: {
                email: req.body.email,
                [Op.not]: {
                    id: req.body.id
                }
            }
        });
        if (count_email) {
            req.flash('error', 'Email Already Exist');
            res.redirect('/providerlist');
            return;
        } else {
            image_name = req.body.hiddenimage;
            image_skill = req.body.skillsimage;

            id = req.body.id;
            var password = "";
            if (req.body.password == "") {
                password = req.body.oldpassword
            } else {
                password = crypto.createHash('sha1').update(req.body.password).digest('hex');
            }
            if (req.files && req.files.image) {

                let image = req.files.image;
                var extension = path.extname(image.name);
                var fileimage = uuid() + extension;
                image.mv(process.cwd() + '/public/app-assets/images/users/' + fileimage, function(err) {
                    if (err)
                        return res.status(500).send(err);
                });
                image_name = fileimage;
            }
            if (req.files && req.files.skillandqualification) {

                let image = req.files.skillandqualification;
                var extension = path.extname(image.name);
                var fileimage = uuid() + extension;
                image.mv(process.cwd() + '/public/app-assets/images/users/' + fileimage, function(err) {
                    if (err)
                        return res.status(500).send(err);
                });
                image_skill = fileimage;
            }
            const update_users = await users.update({
                username: req.body.username,
                profileImage: image_name,
                phone: req.body.phone,
                email: req.body.email,
                password: password,
                vaccineCost: req.body.vaccine,
                address: req.body.address,
                lat: req.body.lat,
                lng: req.body.lng,
                address: req.body.location,
                lat: req.body.lat,
                lng: req.body.lng,
                whychooseme: req.body.whychooseme,
                whyLoveThis: req.body.whyLoveThis,
                serviceCategory: req.body.serviceCategory,
                acceptedPettype: req.body.acceptedPettype,
                levelofSupervision: req.body.levelofSupervision,
                numberofwalksPerday: req.body.numberofwalksPerday,
                accesstoOutdorr: req.body.accesstoOutdorr,
                typeofHome: req.body.typeofHome,
                emergencyTransport: req.body.emergencyTransport,
                distanceWillingtravel: req.body.distanceWillingtravel,
                skillandqualification: image_skill
            }, {
                where: {
                    id: req.body.id
                }

            });
            req.flash('msg', 'Provider Successfully Updated');
            res.redirect('/providerlist');
        }
    },

}