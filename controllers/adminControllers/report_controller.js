const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const report = db.report
const sequelize = require('sequelize');



module.exports = {

    user_report: async function(req, res) {


        res.render('admin/reportlist', { sessiondata: req.session, msg: req.flash('msg'), error: req.flash('error'), title: 'reports' });

    },

    tax_report: async function(req, res) {


        res.render('admin/taxreport', { sessiondata: req.session, msg: req.flash('msg'), error: req.flash('error'), title: 'reports' });

    },
    revenuereport: async function(req, res) {


        res.render('admin/revenuereport', { sessiondata: req.session, msg: req.flash('msg'), error: req.flash('error'), title: 'reports' });

    },
    report_list: async function(req, res) {
        var post = await report.findAll({
            attributes: [`createdAt`, 'comment', [sequelize.literal('(SELECT username FROM users WHERE id = report.report_by)'), 'report_by'],
                [sequelize.literal('(SELECT username FROM users WHERE id = report.report_to)'), 'report_to'],
            ],
            order: [
                ['id', 'desc'],
            ]
        });
        post = post.map(value => {
            return value.toJSON();
        });
        res.render('admin/reportlist', { sessiondata: req.session, response: post, msg: req.flash('msg'), error: req.flash('error'), title: 'report' });

    },

}