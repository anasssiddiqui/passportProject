const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const reviews = db.reviews
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
const users = db.users



module.exports = {

    reviewslist: async function(req, res) {
        var review_data = await reviews.findAll({
            attributes: ['id', 'comment', 'ratings', [sequelize.literal('(select username FROM users where id=reviews.userid)'), 'username'],
                [sequelize.literal('(select username FROM users where id=reviews.user2id)'), 'user2'],
            ],

            order: [
                ['id', 'DESC'],
            ],

        });

        review_data = review_data.map(value => {
            return value.toJSON();
        });


        res.render('admin/review', { sessiondata: req.session, response: review_data, msg: req.flash('msg'), error: req.flash('error'), title: 'Review' });

    },




}