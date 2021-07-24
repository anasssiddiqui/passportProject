const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const assignedJobs = db.assignedJobs
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
const users = db.users

assignedJobs.belongsTo(users, {
    foreignKey: "userid",
    as: "users"
});
assignedJobs.belongsTo(users, {
    foreignKey: "providerid",
    as: "provider"
});
module.exports = {

    assignedjobslist: async function(req, res) {

        var jobs_data = await assignedJobs.findAll({

            include: [{
                model: users,
                as: "users",
                required: true,
                attributes: ['id', 'username']
            }, {
                model: users,
                as: "provider",
                required: true,
                attributes: ['id', 'username']
            }],
            order: [
                ['id', 'DESC'],
            ],

        });
        // console.log(jobs_data);
        // return
        jobs_data = jobs_data.map(value => {
            return value.toJSON();
        });

        // console.log(jobs_data[0]);
        // return

        // console.log(payments_data, "=====================");
        // return
        res.render('admin/assignedjoblist', { sessiondata: req.session, response: jobs_data, msg: req.flash('msg'), error: req.flash('error'), title: 'assigned' });

    },
}