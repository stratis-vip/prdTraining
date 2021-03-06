"use strict";
//new branch
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const BBindex_1 = require("./routes/BBindex");
const athletes_1 = require("./routes/athletes");
const activities_1 = require("./routes/activities");
const login_1 = require("./routes/login");
const logout_1 = require("./routes/logout");
const signin_1 = require("./routes/signin");
const profile_1 = require("./routes/profile");
const imports_1 = require("./routes/imports");
const errorcodes_1 = require("./routes/errorcodes");
const errorfunctions_1 = require("./lib/control/errorfunctions");
let flash = require('express-flash-2');
const app = express();
let options = {
    resave: false,
    saveUninitialized: false,
    secret: 'lsaDv!fSja890H_lsm#df!@wskfmn9'
};
// view engine setup
app.set('views', path.join(__dirname, 'views/templates'));
app.set('view engine', 'hbs');
//hbs.registerPartial()
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'views/public/images/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(options));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views/public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//ελέγχει πριν από κάθε μια κλήση σε ρούτερ αν είναι ο χρήστης αυθεντικοποιημένος
//app.use(check)
app.use(flash());
app.use('/', BBindex_1.router);
app.use('/athletes', athletes_1.router);
app.use('/activities', activities_1.router);
app.use('/login', login_1.router);
app.use('/logout', logout_1.router);
app.use('/signin', signin_1.router);
app.use('/imports', imports_1.router);
app.use('/profile', profile_1.router);
app.use('/errorcodes', errorcodes_1.router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    return errorfunctions_1.errorPage(res, `${req.url}`, err.message, err.status);
    //res.render('error');
});
module.exports = app;
