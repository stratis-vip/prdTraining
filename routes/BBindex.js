"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("../lib/models/database");
const crypt = require("bcrypt");
const router = express.Router();
exports.router = router;
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Βοηθός Προπονητή', logged: req.session.user });
    console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
});
router.post('/', (req, res, next) => {
    let user = req.body.userName;
    let pass = req.body.password;
    let checkDb = new database_1.default();
    checkDb.findAthlitiByMail(user, (err, isfound, ath) => {
        if (isfound) {
            crypt.compare(pass, ath[0].pass, (err, same) => {
                if (same) {
                    req.session.user = user;
                    //res.locals.user = req.body.userName;
                    console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
                    console.log(JSON.stringify(req.body));
                    //console.log(`${app.locals.user}`);
                    res.render('index', { title: 'Βοηθός Προπονητή', logged: req.session.user });
                }
                else {
                    res.redirect('/login');
                }
            });
        }
        else {
            res.redirect('/login');
        }
    });
});
