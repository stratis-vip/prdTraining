"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("../lib/models/database");
const crypt = require("bcryptjs");
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
    if (user.trim() === "" || pass.trim() === "") {
        res.flash('error', `Τα στοιχεία είναι υποχρεωτικά!`);
        return res.redirect('/login');
    }
    let checkDb = new database_1.default();
    checkDb.findAthlitiByMail(user, (err, isfound, ath) => {
        if (isfound) {
            crypt.compare(pass, ath[0].pass, (err, same) => {
                if (same) {
                    req.session.user = user;
                    res.render('index', { title: 'Βοηθός Προπονητή', logged: ath[0].fullname });
                }
                else {
                    res.flash('error', 'Δεν μπορούν να πιστοποιηθούν τα στοιχεία!');
                    res.redirect('/login');
                }
            });
        }
        else {
            res.flash('error', `Δεν υπάρχει Μέλος καταχωρημένο στο ${user}`);
            res.redirect('/login');
        }
    });
});
