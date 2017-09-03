"use strict";
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const BBindex_1 = require("./routes/BBindex");
const users_1 = require("./routes/users");
const login_1 = require("./routes/login");
const app = express();
let options = {
    resave: false,
    saveUninitialized: false,
    secret: 'lsaDv!fSja890H_lsm#df!@wskfmn9'
};
// view engine setup
app.set('views', path.join(__dirname, 'views/templates'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'views/public/images/', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(options));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views/public')));
app.use('/', BBindex_1.router);
app.use('/users', users_1.router);
app.use('/login', login_1.router);
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
    res.render('error');
});
module.exports = app;
