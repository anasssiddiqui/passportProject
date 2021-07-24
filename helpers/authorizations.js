const JsonWebToken = require('jsonwebtoken');
const commonFunctions = require('../helpers/commonFunctions');
const jsonData = require('../helpers/jsonData');

module.exports = {

    passportTokkenCreation: async function(createUser) {
        const accessTokken = JsonWebToken.sign(createUser, process.env.ACCESS_TOKEN_SECRET)
        return accessTokken
    },
    authenticatetokken: async function(req, res, next) {
        var required = {
            security_key: req.headers.security_key,
            authorization: req.headers.authorization
        }
        non_required = {

        }
        let requestData = await commonFunctions.vaildObject(required, non_required, res);

        var token = requestData.authorization.split(' ')[1];
        JsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                jsonData.Unauthorized(res, 'Invalid authorization');
                return
            }


            req.user = user
            next()
        })
    },

    check_admin_auth: function(req, res, next) {
        if (req.session && req.session.auth == true) {
            next();
        } else {
            req.flash('msg', 'Please login first');
            res.redirect('/admin');
        }
    },
}