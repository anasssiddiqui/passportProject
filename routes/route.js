// ---------------------admin_panel----------------------
const admin = require('../controllers/adminControllers/admin_controller');


// --------------------teacher-pannel---------------------

// ---------------------apicontroller----------------------



// ---------------------sessions--------------------------
var helper = require('../helpers/authorizations');
const check_session = helper.check_admin_auth



module.exports = function(app) {






    // --------------------------------------------------Admin_panel-------------------------------------------------------
    app.route('/admin').get(admin.login);
    app.route('/signin').post(admin.adminlogin);
    app.route('/dashboard').get(check_session, admin.dashboard);
    app.route('/profile').get(check_session, admin.profile);
    app.route('/logout').get(check_session, admin.logout);
    app.route('/updateadminprofile').post(check_session, admin.updateadminprofile);
    app.route('/updateadminpassword').post(check_session, admin.updateadminpassword);
    app.route('/updatecommision').post(check_session, admin.updatecommision);
    app.route('/updatecartvalue').post(check_session, admin.updatecartvalue);
    app.route('/admin_statuschange').post(check_session, admin.admin_statuschange);
    app.route('/commission').get(check_session, admin.commission);






}