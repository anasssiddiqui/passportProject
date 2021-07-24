const db = require('../../models');
const helper = require('../../config/helper');
var crypto = require('crypto')
const payments = db.payments
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
const postsReport = db.postsReport


module.exports = {

    postsReportlist: async function(req, res) {
        var contactdata_data = await postsReport.findAll({
            attributes: ['id', 'reason', 'description', [sequelize.literal('(SELECT username FROM users WHERE id = postsReport.reportBy)'), 'reportBy'],
                [sequelize.literal('(SELECT title FROM posts WHERE id = postsReport.postId)'), 'title']
            ],
            order: [
                ['id', 'DESC'],
            ],

        });

        contactdata_data = contactdata_data.map(value => {
            return value.toJSON();
        });

        // console.log(payments_data, "=====================");
        // return
        res.render('admin/postsReportList', { sessiondata: req.session, response: contactdata_data, msg: req.flash('msg'), error: req.flash('error'), title: 'postReportList' });

    },

    viewPostReport: async function(req, res) {
        // console.log(req.query.id, "-------");
        // return
        var payments_data = await postsReport.findOne({
            attributes: ['id', 'reason', 'description', [sequelize.literal('(SELECT username FROM users WHERE id = postsReport.reportBy)'), 'reportBy'],
                [sequelize.literal('(SELECT title FROM posts WHERE id = postsReport.postId)'), 'title']
            ],
            where: {
                id: req.query.id
            },
        });

        res.render('admin/viewPostReport', { sessiondata: req.session, response: payments_data, msg: req.flash('msg'), error: req.flash('error'), title: 'postReportList' });

    },

    sendmail: async function(req, res) {
        // console.log(req.body.useremail, req.body.message);
        // return

        var find_users = req.body.useremail
        var message = req.body.message
        helper.send_emails(message, find_users);

        req.flash('msg', "Sent Message Successfully.");
        res.redirect('/postsReportList');

    },

}