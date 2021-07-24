// ---------------------admin_panel----------------------
const admin = require('../controllers/adminControllers/admin_controller');
const users = require('../controllers/adminControllers/users_controller');
const terms = require('../controllers/adminControllers/terms_controller');
const contactus = require('../controllers/adminControllers/contactus_controller');
const occupations = require('../controllers/adminControllers/occupations_controller');
const tags = require('../controllers/adminControllers/tags_controller');
const images = require('../controllers/adminControllers/images_controller');
const posts = require('../controllers/adminControllers/posts_controller');
const reasons = require('../controllers/adminControllers/reportReasons_controller');
const report = require('../controllers/adminControllers/postReport_controller');

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




    //---------------------------user----------------------------------------
    app.route('/adduser').get(check_session, users.adduser);
    app.route('/createuser').post(check_session, users.createuser);
    app.route('/userslist').get(check_session, users.userslist);
    app.route('/edituser').get(check_session, users.edituser);
    app.route('/update_user').post(check_session, users.update_user);
    app.route('/deleteuser').post(check_session, users.deleteuser);
    app.route('/users_statuschange').post(check_session, users.users_statuschange);
    app.route('/viewuser').get(check_session, users.viewuser);


    //---------------------------contactus----------------------------------
    app.route('/contactuslist').get(check_session, contactus.contactuslist);
    app.route('/viewcontactus').get(check_session, contactus.viewcontactus);
    app.route('/sendmail').post(check_session, contactus.sendmail);

    //---------------------------occupations----------------------------------
    app.route('/catlist').get(check_session, occupations.catlist);
    app.route('/addcat').post(check_session, occupations.addcat);
    app.route('/deletecat').post(check_session, occupations.deletecat);
    app.route('/cat_statuschange').post(check_session, occupations.cat_statuschange);

    //---------------------------Tags----------------------------------
    app.route('/taglist').get(check_session, tags.catlist);
    app.route('/addtag').post(check_session, tags.addcat);
    app.route('/deletetag').post(check_session, tags.deletecat);
    app.route('/tag_statuschange').post(check_session, tags.cat_statuschange);



    //-----------------------------terms------------------------------------
    app.route('/terms').get(check_session, terms.terms);
    app.route('/update_terms').post(check_session, terms.update_terms);
    app.route('/update_policys').post(check_session, terms.update_policys);
    app.route('/cookiespolicys').post(check_session, terms.cookiespolicys);
    app.route('/aboutus').post(check_session, terms.aboutus);
    app.route('/termsofuse').post(check_session, terms.termsofuse);

    //----------------------------images------------------------------------
    app.route('/getimages').get(check_session, images.getimages);
    app.route('/addnewimage').post(check_session, images.addnewimage);
    app.route('/delete_image').post(check_session, images.delete_image);


    //----------------------------posts------------------------------------
    app.route('/postslist').get(check_session, posts.postslist);
    app.route('/editpost').get(check_session, posts.editpost);
    app.route('/updatePost').post(check_session, posts.updatePost);
    app.route('/deletepost').post(check_session, posts.deletepost);


    //---------------------------reasons----------------------------------
    app.route('/reasonsList').get(check_session, reasons.reasonsList);
    app.route('/addReasons').post(check_session, reasons.addReasons);
    app.route('/deleteReasons').post(check_session, reasons.deleteReasons);
    app.route('/reasonsStatusChange').post(check_session, reasons.reasonsStatusChange);


    //---------------------------Report routes---------------------------
    app.route('/postsReportlist').get(check_session, report.postsReportlist);
    app.route('/viewPostReport').get(check_session, report.viewPostReport);
    app.route('/sendmail').post(check_session, report.sendmail);

}