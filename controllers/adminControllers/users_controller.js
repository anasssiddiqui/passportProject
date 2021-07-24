const db = require('../../models');
const Helper = require('../../config/helper');
var crypto = require('crypto')
const users = db.users
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
const posts = db.posts
const occupations = db.occupations
const tags = db.tags


module.exports = {
    edituser: async function(req, res) {

        var users_data = await users.findOne({
            where: {
                id: req.query.id
            },
        });

        var Occupationslist = await occupations.findAll({
            where: {

                [Op.not]: {
                    status: 0
                }
            }
        });

        var tagslist = await tags.findAll({
            where: {

                [Op.not]: {
                    status: 0
                }
            }
        });
        res.render('admin/edituser', {
            users_data: users_data,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            Occupationslist: Occupationslist,
            tagslist: tagslist,
            title: 'User'
        });
    },
    adduser: async function(req, res) {
        var Occupationslist = await occupations.findAll({
            where: {

                [Op.not]: {
                    status: 0
                }
            }
        });

        var tagslist = await tags.findAll({
            where: {

                [Op.not]: {
                    status: 0
                }
            }
        });
        res.render('admin/adduser', { sessiondata: req.session, Occupationslist: Occupationslist, tagslist: tagslist, msg: req.flash('msg'), error: req.flash('error'), title: 'User' });
    },
    createuser: async function(req, res) {

        image_name = "";

        const count = await users.count({
            where: {
                email: req.body.email,
            }
        });
        if (count > 0) {
            req.flash('error', 'Email Already Exist');
            res.redirect('/adduser');
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
        const user_password = crypto.createHash('sha1').update(req.body.password).digest('hex');
        var auth_create = crypto.randomBytes(20).toString('hex');


        const adduser = await users.create({
            occupationId: req.body.occupation,
            username: req.body.username,
            profileImage: image_name,
            phone: req.body.phone,
            email: req.body.email,
            password: user_password,
            vaccineCost: req.body.vaccine,
            lat: req.body.lat,
            lng: req.body.lng,
            authKey: auth_create,
            userType: 1,
            address: req.body.location,
            lat: req.body.lat,
            lng: req.body.lng,
            tag: req.body.tags

        });

        console.log(adduser.dataValues.username, "=======username")
        let username = adduser.dataValues.username.substr(0, 3).toUpperCase() + '_' + Math.floor(1000 + Math.random() * 9000);

        let updateJob = await users.update({
            uniqueName: username,
        }, {
            where: {
                id: adduser.dataValues.id
            }
        });
        if (adduser) {
            req.flash('msg', 'User Successfully Added');
            res.redirect('/userslist');
        } else {
            console.log(error)
        }
    },
    userslist: async function(req, res) {
        var users_data = await users.findAll({
            where: {
                userType: 1
            },
            order: [
                ['id', 'DESC'],
            ],
        });
        users_data = users_data.map(value => {
            return value.toJSON();
        });
        res.render('admin/userslist', { sessiondata: req.session, response: users_data, msg: req.flash('msg'), error: req.flash('error'), title: 'User' });

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
    viewuser: async function(req, res) {
        var users_data = await users.findOne({
            where: {
                id: req.query.id
            },
        });

        var users_posts = await posts.findAll({
            where: {
                userId: req.query.id
            },
        });

        var response = {
            users_posts: users_posts
        }


        res.render('admin/viewuser', {
            users_data: users_data,
            response: response,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'User'
        });
    },
    update_user: async function(req, res) {
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
            res.redirect('/userslist');
            return;
        } else {
            image_name = req.body.hiddenimage;
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
            const update_users = await users.update({
                username: req.body.username,
                profileImage: image_name,
                phone: req.body.phone,
                email: req.body.email,
                password: password,
                vaccineCost: req.body.vaccine,
                address: req.body.location,
                lat: req.body.lat,
                lng: req.body.lng,
                tag: req.body.tags
            }, {
                where: {
                    id: req.body.id
                }

            });

            const findname = await users.findOne({
                where: {
                    id: req.body.id
                }
            });
            let username = findname.dataValues.username.substr(0, 3).toUpperCase() + '_' + Math.floor(1000 + Math.random() * 9000);

            let updateJob = await users.update({
                uniqueName: username,
            }, {
                where: {
                    id: req.body.id
                }
            });
            req.flash('msg', 'User Successfully Updated');
            res.redirect('/userslist');
        }
    },

}