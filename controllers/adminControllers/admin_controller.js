const db = require('../../models');
const users = db.users
var crypto = require('crypto')
const database = require('../../db/db');
const sequelize = require('sequelize');
const Helper = require('../../config/helper');
const admin = db.admin
const occupations = db.occupations
const posts = db.posts


module.exports = {

    admin_statuschange: async function(req, res) {
        console.log(req.body.id, "=====================");
        console.log(req.body.status, "=====================");

        let update = await admin.update({
            status: req.body.status
        }, {
            where: {
                id: 1
            }
        });

        req.session.user.status = req.body.status;

        // console.log(status, "=============================================count")

        res.json(1);

    },
    updatecartvalue: async function(req, res) {


        let update = await admin.update({
            minimumCartValue: req.body.cartvalue,
        }, {
            where: {
                id: req.body.id,
            }
        })
        req.flash('msg', 'Cart value Successfully Updated');
        res.redirect('/profile')
    },

    updateadminpassword: async function(req, res) {

        const newpass = crypto.createHash('sha1').update(req.body.NewPassword).digest('hex');
        let crypt = crypto.createHash('sha1').update(req.body.oldPassword).digest('hex');

        let checkpass = await admin.findOne({
            where: {
                password: crypt
            }
        });
        if (checkpass) {

            let update = await admin.update({
                password: newpass
            }, {
                where: {
                    id: req.body.id,
                }
            })
            req.flash('msg', 'Profile Successfull Updated');
            res.redirect('/profile')
        } else {
            req.flash('error', 'Old Password Not Match');
            res.redirect('/profile')
        }
    },

    updatecommision: async function(req, res) {


        let update = await admin.update({
            commision: req.body.commision
        }, {
            where: {
                id: req.body.id,
            }
        })
        req.flash('msg', 'Commission Successfull Updated');
        res.redirect('/profile')

    },
    updateadminprofile: async function(req, res) {

        old_image = req.body.hiddenimage;
        bannerold_image = req.body.bannerimage;
        /*console.log(req.files,"--------------req.files");*/
        if (req.files && req.files.profieimage) {
            let profieimage = req.files.profieimage;
            image_url = req.files.profieimage.name;

            profieimage.mv(process.cwd() + '/public/app-assets/images/admin/' + profieimage.name, function(err) {
                if (err)
                    return res.status(500).send(err);
            });

            old_image = image_url;
        }
        if (req.files && req.files.banner) {
            let banner = req.files.banner;
            image_url = req.files.banner.name;

            banner.mv(process.cwd() + '/public/app-assets/images/admin/' + banner.name, function(err) {
                if (err)
                    return res.status(500).send(err);
            });

            bannerold_image = image_url;
        }
        let update = await admin.update({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: old_image,
            banner: bannerold_image,
        }, {
            where: {
                id: req.body.id,
            }
        });
        if (update) {
            get_details = await admin.findOne({
                where: {
                    id: req.body.id,
                }
            });
            if (get_details) {
                res.session = req.session;
                req.session.user = get_details.dataValues;
            }
            req.flash('msg', 'Profile Successfully Updated');
            res.redirect('/profile')
        } else {
            req.flash('msg', 'Something wrong please try again');
            res.redirect('/profile')
        }
    },
    logout: async function(req, res) {

        req.session.email = '';
        req.session.auth = false;

        res.redirect('/admin')
    },
    dashboard: async function(req, res) {

        var user_data = await users.findAll({
            where: {
                userType: 1
            },
            order: [
                ['id', 'DESC'],
            ],
            limit: 5
        });

        var provider_data = await users.findAll({
            where: {
                userType: 2
            },
            order: [
                ['id', 'DESC'],
            ],
            limit: 5
        });

        user_data = user_data.map(value => {
            return value.toJSON();
        });


        const user_count = await users.count({
            where: {
                userType: 1
            },
        });

        const provider_count = await users.count({
            where: {
                userType: 2
            },
        });



        const cat_count = await occupations.count({

        });
        const posts_count = await posts.count({

        });



        let countdata = {
            user_count: user_count,
            user_data: user_data,
            cat_count: cat_count,
            provider_data: provider_data,
            posts_count: posts_count

        }


        res.render('admin/dashboard', { sessiondata: req.session, countdata: countdata, msg: req.flash('msg'), error: req.flash('error'), title: 'dashboard' });
    },
    login: async function(req, res) {
        if (req.session && req.session.auth == true) {
            res.redirect('/dashboard');
        } else {
            res.render('admin/index', { msg: req.flash('msg'), error: req.flash('error') });
        }
    },
    adminlogin: async function(req, res) {
        const admin_password = crypto.createHash('sha1').update(req.body.password).digest('hex');
        /*console.log(req.body,"==================body")*/
        get_details = await admin.findOne({
            where: {
                email: req.body.username,
                password: admin_password,
            }
        });
        if (get_details) {
            res.session = req.session;
            req.session.user = get_details.dataValues;
            req.session.auth = true;
            res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid username or password');
            res.redirect('/admin')
        }
    },
    profile: async function(req, res) {
        var admin_data = await admin.findOne({
            where: {
                id: 1
            },
        });
        res.render('admin/adminprofile', {
            response: admin_data,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'profile'
        });

    },
    commission: async function(req, res) {
        var admin_data = await admin.findOne({
            where: {
                id: 1
            },
        });
        res.render('admin/adminprofile', {
            response: admin_data,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'commision'
        });

    },
}