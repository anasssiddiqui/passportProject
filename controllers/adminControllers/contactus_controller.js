const db = require('../../models');
const helper = require('../../config/helper');
var crypto = require('crypto')
const payments = db.payments
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
const contactus = db.contactus


module.exports = {

    contactuslist: async function(req, res) {
        var contactdata_data = await contactus.findAll({
            attributes: ['id', 'message', 'email', 'name', 'userid'],
            order: [
                ['id', 'DESC'],
            ],

        });

        contactdata_data = contactdata_data.map(value => {
            return value.toJSON();
        });

        // console.log(payments_data, "=====================");
        // return
        res.render('admin/contactuslist', { sessiondata: req.session, response: contactdata_data, msg: req.flash('msg'), error: req.flash('error'), title: 'contactus' });

    },

    viewcontactus: async function(req, res) {
        // console.log(req.query.id, "-------");
        // return
        var payments_data = await contactus.findOne({
            attributes: ['id', 'message', 'email', 'name', 'userid'],

            where: {
                id: req.query.id
            },
        });

        res.render('admin/viewcontactus', { sessiondata: req.session, response: payments_data, msg: req.flash('msg'), error: req.flash('error'), title: 'Payments' });

    },

    sendmail: async function(req, res) {
        // console.log(req.body.useremail, req.body.message);
        // return

        var find_users = req.body.useremail
        var message = req.body.message
        helper.send_emails(message, find_users);

        req.flash('msg', "Sent Message Successfully.");
        res.redirect('/contactuslist');

    },

}