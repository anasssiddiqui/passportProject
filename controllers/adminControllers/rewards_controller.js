const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const rewardsSettings = db.rewardsSettings
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');


module.exports = {
    addreward: async function(req, res) {

        if (req.body.id == "") {
            const vehcile = await rewardsSettings.create({
                points: req.body.points,
                discountPercentage: req.body.discountPercentage
            });
            req.flash('msg', 'Rewards Successfully Added');
        } else {
            let update = await rewardsSettings.update({
                points: req.body.points,
                discountPercentage: req.body.discountPercentage
            }, {
                where: {
                    id: req.body.id,
                }
            });
            req.flash('msg', 'Rewards Successfully Updated');
        }

        res.redirect('/rewardslist');

    },
    rewardslist: async function(req, res) {

        var taxdata = await rewardsSettings.findAll({

        });
        taxdata = taxdata.map(value => {
            return value.toJSON();
        });

        res.render('admin/rewardslist', { sessiondata: req.session, response: taxdata, msg: req.flash('msg'), error: req.flash('error'), title: 'reward' });

    },
    reward_statuschange: async function(req, res) {
        console.log("===============================")

        let update = await rewardsSettings.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status = await rewardsSettings.findOne({
            where: {
                id: req.body.id,
            },
            raw: true
        });
        // console.log(status, "=============================================count")
        if (status.status == 1) {
            res.json(1);
        } else {
            res.json(2);
        }
    },
    deletereward: async function(req, res) {

        const dlt = await rewardsSettings.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },


}