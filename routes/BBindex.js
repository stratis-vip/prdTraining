"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const crypt = require("bcryptjs");
const db_athlites_1 = require("../lib/models/db-athlites");
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
    let checkDb = new db_athlites_1.default();
    checkDb.findAthlitiByMail(user, (err, isfound, ath) => {
        if (isfound) {
            crypt.compare(pass, ath[0].pass, (err, same) => {
                if (same) {
                    req.session.user = ath[0];
                    req.session.userid = ath[0].id;
                    res.render('index', { title: 'Βοηθός Προπονητή', logged: ath[0] });
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
