const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const payments = db.payments
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');


module.exports = {
    payment_statuschange: async function(req, res) {
        console.log(req.body.id, "=====================");
        console.log(req.body.status, "=====================");

        let update = await payments.update({
            approved: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status_data = await payments.findOne({
            where: {
                id: req.body.id,
            }
        });
        // console.log(status, "=============================================count")
        if (status_data.dataValues.approved == 1) {
            res.json(1);
        } else if (status_data.dataValues.approved == 2) {
            res.json(2);
        } else {
            res.json(0);
        }
    },



    offlinepayment: async function(req, res) {
        var payments_data = await payments.findAll({
            attributes: ['id', 'amount', 'comment', 'transactionId', 'createdAt', 'paymentMethod', 'paymentDuration', 'approved', 'recepitImage', [sequelize.literal('(select username FROM users where id=payments.user_id)'), 'username'], ],
            order: [
                ['id', 'DESC'],
            ],
            where: {
                paymentMethod: 0

            }
        });

        payments_data = payments_data.map(value => {
            return value.toJSON();
        });

        // console.log(payments_data, "=====================");
        // return
        res.render('admin/offlinepaymentlist', { sessiondata: req.session, response: payments_data, msg: req.flash('msg'), error: req.flash('error'), title: 'Payments' });

    },
    get_payments: async function(req, res) {
        var payments_data = await payments.findAll({
            attributes: ['id', 'amount', 'comment', 'transactionId', 'createdAt', 'paymentMethod', 'paymentDuration', [sequelize.literal('(select username FROM users where id=payments.user_id)'), 'username'], ],
            order: [
                ['id', 'DESC'],
            ],
            where: {
                paymentMethod: 1

            }
        });

        payments_data = payments_data.map(value => {
            return value.toJSON();
        });

        // console.log(payments_data, "=====================");
        // return
        res.render('admin/paymentslist', { sessiondata: req.session, response: payments_data, msg: req.flash('msg'), error: req.flash('error'), title: 'Payments' });

    },

    viewpayment: async function(req, res) {
        // console.log(req.query.id, "-------");
        // return
        var payments_data = await payments.findOne({
            attributes: ['id', 'amount', 'comment', 'transactionId', 'paymentMethod', 'createdAt', 'approved', 'recepitImage', [sequelize.literal('(select username FROM users where id=payments.user_id)'), 'username'],
                [sequelize.literal('(select profile_image FROM users where id=payments.user_id)'), 'profileImage'],
                [sequelize.literal('(select email FROM users where id=payments.user_id)'), 'email'],
                [sequelize.literal('(select phone FROM users where id=payments.user_id)'), 'phone'],
            ],
            where: {
                id: req.query.id
            },
        });



        res.render('admin/viewpayments', { sessiondata: req.session, response: payments_data, msg: req.flash('msg'), error: req.flash('error'), title: 'Payments' });

    },


}