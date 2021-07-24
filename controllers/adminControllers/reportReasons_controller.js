const db = require('../../models');
const Helper = require('../../config/helper');
var crypto = require('crypto')
const reportReasons = db.reportReasons
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');


module.exports = {
    addReasons: async function(req, res) {

        if (req.body.id == "") {

            var find_dublica = await reportReasons.findOne({
                where: {
                    reasons: req.body.reasons
                }
            });

            if (find_dublica) {
                req.flash('error', 'This reason is already used');
                res.redirect('/reasonsList');
                return
            }


            const vehcile = await reportReasons.create({

                reasons: req.body.reasons
            });

            req.flash('msg', 'Reason Successfully Added');
        } else {


            var find_dublica = await reportReasons.findOne({
                where: {
                    reasons: req.body.reasons,
                    [Op.not]: {
                        id: req.body.id
                    }
                }
            });

            if (find_dublica) {
                req.flash('error', 'This reason is already used');
                res.redirect('/reasonsList');
                return
            }
            let update = await reportReasons.update({
                reasons: req.body.reasons
            }, {
                where: {
                    id: req.body.id,
                }
            });
            req.flash('msg', 'Reason Successfully Updated');

        }

        res.redirect('/reasonsList');

    },
    reasonsList: async function(req, res) {

        var taxdata = await reportReasons.findAll({
            order: [
                ['id', 'DESC'],
            ],
        });
        taxdata = taxdata.map(value => {
            return value.toJSON();
        });
        console.log(taxdata)
        res.render('admin/reportReasonslist', { sessiondata: req.session, response: taxdata, msg: req.flash('msg'), error: req.flash('error'), title: 'reasonsList' });

    },
    reasonsStatusChange: async function(req, res) {
        console.log("===============================")

        let update = await reportReasons.update({
            status: req.body.status
        }, {
            where: {
                id: req.body.id,
            }
        });
        var status = await reportReasons.count({
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
    deleteReasons: async function(req, res) {

        const dlt = await reportReasons.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },


}