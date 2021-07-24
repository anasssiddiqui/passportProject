const db = require('../models');
const Helper = require('../config/helper');
var crypto = require('crypto')
const users = db.users
const sequelize = require('sequelize');
var Op = sequelize.Op;
var path = require('path');
var uuid = require('uuid');
var exams = db.exams
var jobrequests = db.jobrequests
jobrequests.belongsTo(users, {
    foreignKey: "userid"
});
module.exports = {

    addrequest: async function(req, res) {

        var users_data = await users.findAll({
            where: {
                userType: 1
            },

        });
        res.render('admin/addrequest', { sessiondata: req.session, response: users_data, msg: req.flash('msg'), error: req.flash('error'), title: 'request' });
    },
    creatrequest: async function(req, res) {


        let jobId = 'PAWS-' + Math.floor(1000 + Math.random() * 9000);


        const addrequest = await jobrequests.create({
            userid: req.body.userid,
            jobid: jobId,
            petType: req.body.pettype,
            numberofPets: req.body.petsno,
            bredd: req.body.breed,
            numberofDays: req.body.daysnights,
            address: req.body.address,
            specialRequest: req.body.specialrequest,
            dateTime: req.body.date,
            size: req.body.size
        });
        if (addrequest) {
            req.flash('msg', 'Request Successfully Added');
            res.redirect('/requestslist');
        } else {
            console.log(error)
        }
    },
    requestslist: async function(req, res) {
        var users_data = await jobrequests.findAll({
            include: [{
                model: users,
                required: true,
                attributes: ['id', 'username'],
                raw: true
            }],

            order: [
                ['id', 'DESC'],
            ],
        });
        users_data = users_data.map(value => {
            return value.toJSON();
        });

        console.log(users_data)
        res.render('admin/requestslist', { sessiondata: req.session, response: users_data, msg: req.flash('msg'), error: req.flash('error'), title: 'request' });

    },

    editrequest: async function(req, res) {
        console.log("hiiiiiiiiiiiii")


        var userslist = await users.findAll({
            where: {
                userType: 1
            },

        });
        var users_data = await jobrequests.findOne({
            where: {
                id: req.query.id
            },

        });

        res.render('admin/editrequest', { sessiondata: req.session, users_data: users_data, userslist: userslist, msg: req.flash('msg'), error: req.flash('error'), title: 'request' });

    },

    deleterequest: async function(req, res) {

        const dlt = await jobrequests.destroy({
            where: {
                id: req.body.id
            }
        });
        res.json(1);
    },

    viewrequest: async function(req, res) {
        var jobdata = await jobrequests.findOne({
            where: {
                id: req.query.id
            },
            raw: true
        });
        console.log(jobdata)
        var userdata = await users.findOne({
            where: {
                id: jobdata.userid
            },
            raw: true

        });

        var response = {
            userdata: userdata,
            jobdata: jobdata
        }
        console.log(response)
        res.render('admin/viewjob', {

            response: response,
            msg: req.flash('msg'),
            error: req.flash('error'),
            sessiondata: req.session,
            title: 'request'
        });
    },
    updaterequest: async function(req, res) {

        const update_users = await jobrequests.update({
            userid: req.body.userid,
            petType: req.body.pettype,
            numberofPets: req.body.petsno,
            bredd: req.body.breed,
            numberofDays: req.body.daysnights,
            address: req.body.address,
            specialRequest: req.body.specialrequest,
            dateTime: req.body.date,
            size: req.body.size
        }, {
            where: {
                id: req.body.id
            }

        });
        req.flash('msg', 'Job request Successfully Updated');
        res.redirect('/requestslist');

    },

}