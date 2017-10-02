//new branch
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as session from 'express-session';
import {router as index} from  './routes/BBindex';
import {router as users} from './routes/users';
import {router as login} from './routes/login';
import {router as logout} from './routes/logout';
import {router as signin} from './routes/signin';
import {router as profile} from './routes/profile';
import {router as imports} from './routes/imports';
import * as hbs from 'handlebars'
import {check} from './routes/check'


let flash = require('express-flash-2')

const app = express(); 
let options:session.SessionOptions = {
    resave: false,
    saveUninitialized:false,
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
app.use(flash())

app.use('/', index);
app.use('/users', users);
app.use('/login', login);
app.use('/logout', logout);
app.use('/signin', signin);
app.use('/imports', imports);
app.use('/profile', profile);
interface Error {
    status?:number
}
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

export =app;
