const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const toastr = require('express-toastr');
const fs = require('fs');
const passport = require('passport')

const Sequelize = require('sequelize');
const path = require('path');
// const uuid = require('uuid');
const expressValidator = require('express-validator');

let swaggerUi = require('swagger-ui-express');
let swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const mailer = require('express-mailer');
const crypto = require('crypto');
const flash = require('express-flash');
const session = require('express-session');
app.use(session({
    secret: 'ssshhhhh'
}));
app.use(flash());
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(__dirname + '/public'));

app.use(passport.initialize())
app.use(passport.session())
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.use(expressValidator());
app.use(function(req, res, next) {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});
require('./routes/route')(app);
require('./routes/apiroute')(app);


app.listen(3112, function() {
    console.log('Node app is running on port 3112');
});