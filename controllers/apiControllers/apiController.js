require('dotenv').config()
const db = require('../../models');
const helper = require('../../helpers/helper');
const jsonData = require('../../helpers/jsonData');
const commonFunctions = require('../../helpers/commonFunctions');
const passportTokkenCreation = require('../../helpers/authorizations');





module.exports = {
    getProfile: async function(req, res) {
        try {
            let response = await helper.GetUserDetails(req.user.id)
            jsonData.true_status(res, response, `Account details fetched sucessfully`)
        } catch (error) {
            helper.error(res, error)
        }
    },
    signUp: async function(req, res) {
        try {
            const required = {
                security_key: req.headers.security_key,
                email: req.body.email,
                password: req.body.password,
                username: req.body.username,

            };
            const non_required = {
                deviceType: req.body.deviceType,
                deviceToken: req.body.deviceToken,
            };
            let requestData = await commonFunctions.vaildObject(required, non_required, res);

            var dcryptPassword = commonFunctions.bcryptHash(requestData.password);

            const findEmail = await db.users.findOne({
                where: {
                    email: requestData.email
                }
            })

            if (findEmail) throw "This is email is already registered please use another one";

            const createUser = await db.users.create({
                username: requestData.username,
                email: requestData.email,
                password: dcryptPassword
            })
            var accessTokken = await passportTokkenCreation.passportTokkenCreation(createUser.toJSON())

            let response = await helper.GetUserDetails(createUser.id)
            response.dataValues.accessTokken = 'Bearer ' + accessTokken
            jsonData.true_status(res, response, `Hi! dear  ${createUser.username} your account registered sucessfully`)

        } catch (error) {
            commonFunctions.error(res, error)
        }
    },
    userlogin: async function(req, res) {
        try {
            const required = {
                security_key: req.headers.security_key,
                email: req.body.email,
                password: req.body.password,

            };
            const non_required = {
                deviceType: req.body.deviceType,
                deviceToken: req.body.deviceToken,
            };
            let requestData = await commonFunctions.vaildObject(required, non_required, res);
            const findEmail = await db.users.findOne({
                where: {
                    email: requestData.email
                },
                raw: true
            })

            if (!findEmail) throw "Invalid email address! please try again"
            var checkPassword = await commonFunctions.comparePass(
                requestData.password,
                findEmail.password
            );

            if (!checkPassword) throw "Your password is incorrect! please try again"

            var accessTokken = await passportTokkenCreation.passportTokkenCreation(findEmail)

            const updateTokken = await db.users.update({
                deviceToken: requestData.deviceToken,
                deviceType: requestData.deviceType
            }, {
                where: {
                    id: findEmail.id
                }
            })

            let response = await helper.GetUserDetails(findEmail.id)
            response.dataValues.accessTokken = 'Bearer ' + accessTokken

            jsonData.true_status(res, response, `Hi! ${findEmail.username} you successfully login in`)

        } catch (error) {
            commonFunctions.error(res, error)
        }
    },

}