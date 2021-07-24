const db = require('../../models');
const Helper = require('../../config/helper');
var crypto = require('crypto')
const occupations = db.occupations
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');


module.exports = {
    addcat: async function(req, res) {

        if (req.body.id == "") {

            var find_dublica = await occupations.findOne({
                where: {
                    Category: req.body.Category
                }
            });

            if (find_dublica) {
                req.flash('error', 'This Occupation is already used');
                res.redirect('/catlist');
                return
            }


            const vehcile = await occupations.create({

                category: req.body.Category
            });

            req.flash('msg', 'Occupation Successfully Added');
        } else {


            var find_dublica = await occupations.findOne({
                where: {
                    Category: req.body.Category,
                    [Op.not]: {
                        id: req.body.id
                    }
                }
            });

            if (find_dublica) {
                req.flash('error', 'This Occupation is already used');
                res.redirect('/catlist');
                return
            }
            let update = await occupations.update({
                category: req.body.Category
            }, {
                where: {
                    id: req.body.id,
                }
            });
            req.flash('msg', 'Occupation Successfully Updated');

        }

        res.redirect('/catlist');

    },
    catlist: async function(req, res) {

        var taxdata = await occupations.findAll({
            order: [
                ['id', 'DESC'],
            ],
        });
        taxdata = taxdata.map(value => {
            return value.toJSON();
        });
        console.log(taxdata)
        res.render('admin/occupationslist', { sessiondata: req.session, response: taxdata, msg: req.flash('msg'), error: req.flash('error'), title: 'category' });

    },
    cat_statuschange: async function(req, res) {
        console.log("===============================")

        let update = await occupations.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status = await occupations.count({
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
    deletecat: async function(req, res) {

        const dlt = await occupations.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },


}