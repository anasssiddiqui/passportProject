// ---------------------apicontroller----------------------
const api = require('../controllers/apiControllers/apiController');
const helper = require('../helpers/authorizations');

// const multipart = require('connect-multiparty');
// const multipartMiddleware = multipart();
const checkAuthorization = helper.authenticatetokken



// ---------------------sessions--------------------------




module.exports = function(app) {

    // ----------------apis------------------------
    // app.post('/api/fileUpload', multipartMiddleware, api.imageUplaod);

    app.route('/api/userlogin').post(api.userlogin);
    app.route('/api/signUp').post(api.signUp);
    app.route('/api/getProfile').get(checkAuthorization, api.getProfile);






}