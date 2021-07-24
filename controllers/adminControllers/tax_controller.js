const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const taxcategorys = db.taxcategorys
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');


module.exports = {
    addtax: async function(req, res) {

        if (req.body.id == "") {
            var find_dublica = await taxcategorys.findOne({
                where: {
                    taxcategory: req.body.taxcategory
                }
            });

            if (find_dublica) {
                req.flash('error', 'This tax name is already used');
                res.redirect('/taxlist');
                return
            }
            const vehcile = await taxcategorys.create({
                taxcategory: req.body.taxcategory,
                value: req.body.value
            });
            req.flash('msg', 'Tax Successfully Added');
        } else {
            var find_dublica = await taxcategorys.findOne({
                where: {
                    taxcategory: req.body.taxcategory,
                    [Op.not]: {
                        id: req.body.id
                    }
                }
            });
            if (find_dublica) {
                req.flash('error', 'This tax name is already used');
                res.redirect('/taxlist');
                return
            }
            let update = await taxcategorys.update({
                taxcategory: req.body.taxcategory,
                value: req.body.value
            }, {
                where: {
                    id: req.body.id,
                }
            });
            req.flash('msg', 'Tax Successfully Updated');
        }

        res.redirect('/taxlist');

    },
    taxlist: async function(req, res) {

        var taxdata = await taxcategorys.findAll({

        });
        taxdata = taxdata.map(value => {
            return value.toJSON();
        });

        res.render('admin/taxlist', { sessiondata: req.session, response: taxdata, msg: req.flash('msg'), error: req.flash('error'), title: 'tax' });

    },
    tax_statuschange: async function(req, res) {
        console.log("===============================")

        let update = await taxcategorys.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status = await taxcategorys.count({
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
    deletetax: async function(req, res) {

        const dlt = await taxcategorys.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },


}