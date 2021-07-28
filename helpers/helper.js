const bcrypt = require('bcrypt');
const helper = require('../helpers/helper');
const jasonData = require('../helpers/jsonData');


module.exports = {



    GetUserDetails: async function(userId) {
        var userDetails = db.users.findOne({
            attributes: ['id', 'username', 'email'],
            where: {
                id: userId
            }
        })
        return userDetails

    },




}