const db = require('../../models');
const Helper = require('../../config/helper');
var crypto = require('crypto')
const terms = db.terms
const sequelize = require('sequelize');



module.exports = {

    termsofuse: async function(req, res) {

        console.log(req.body.termsofuse, "-------------")
        if (req.body.termsofuse == '') {
            req.flash('error', 'Please fill something');
            res.redirect('/terms')
        }
        const update_users = await terms.update({
            termsofuse: req.body.termsofuse,
        }, {
            where: {
                id: 1
            }
        });
        req.flash('msg', 'Terms of use Successfully Updated');
        res.redirect('/terms');
    },
    cookiespolicys: async function(req, res) {
        // console.log(cookies);
        // return
        if (req.body.cookies == '') {
            req.flash('error', 'Please fill something');
            res.redirect('/terms')
        }
        const update_users = await terms.update({
            cookiespolicys: req.body.cookies,
        }, {
            where: {
                id: 1
            }
        });
        req.flash('msg', 'Cookies policies Successfully Updated');
        res.redirect('/terms');
    },
    aboutus: async function(req, res) {
        // console.log(cookies);
        // return
        if (req.body.aboutUs == '') {
            req.flash('error', 'Please fill something');
            res.redirect('/terms')
        }
        const update_users = await terms.update({
            aboutUs: req.body.aboutUs,
        }, {
            where: {
                id: 1
            }
        });
        req.flash('msg', 'Cookies policies Successfully Updated');
        res.redirect('/terms');
    },
    terms: async function(req, res) {


        var terms_data = await terms.findOne({
            where: {
                id: 1
            },
        });
        res.render('admin/contents', {
            response: terms_data,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'Terms'
        });
    },
    update_terms: async function(req, res) {


        if (req.body.terms_data == '') {
            req.flash('error', 'Please fill something');
            res.redirect('/terms')
        }
        const update_users = await terms.update({
            termsContent: req.body.terms_data,
        }, {
            where: {
                id: 1
            }
        });
        req.flash('msg', 'Terms and Conditions Successfully Updated');
        res.redirect('/terms');

    },
    update_policys: async function(req, res) {

        if (req.body.terms == '') {
            req.flash('error', 'Please fill something');
            res.redirect('/terms')
        }
        const update_users = await terms.update({
            privacyPolicy: req.body.terms,
        }, {
            where: {
                id: 1
            }

        });
        req.flash('msg', 'Privacy Policy Successfully Updated');
        res.redirect('/terms');

    },
}