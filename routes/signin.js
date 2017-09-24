"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const validator = require("validator");
const database_1 = require("../lib/models/database");
const router = express.Router();
exports.router = router;
/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log('in router.signin');
    res.render('signin', { title: 'Εγγραφή' });
});
router.post('/', (req, res, next) => {
    let email = req.body.email;
    let pass = req.body.password;
    let confPass = req.body.confirmpassword;
    if (!validator.isEmail(email)) {
        res.flash('error', `Πρέπει να δωθεί έγκυρη διεύθυνση email`);
        return res.redirect('/signin');
    }
    if (validator.isEmpty(pass) || validator.isEmpty(confPass)) {
        res.flash('error', `Πρέπει να δωθεί password`);
        return res.redirect('/signin');
    }
    if (pass !== confPass) {
        res.flash('error', `Τα συνθηματικά δεν ταιριάζουν`);
        return res.redirect('/signin');
    }
    let checkDb = new database_1.default();
    checkDb.findAthlitiByMail(email, (err, exists) => {
        if (err) {
            res.flash('error', `Η Βάση Δεδομένων φαίνεται να είναι εκτός λειτουργίας.\nΠαρακαλώ ενημερώστε τον διαχειριστή του προγράμματος!`);
            return res.redirect('/signin');
        }
        if (exists) {
            res.flash('error', `Υπάρχει ήδη καταχωρημένο μέλος με το email ${email}.`);
            return res.redirect('/signin');
        }
        checkDb.registerAthliti(email, pass, (err) => {
            if (err) {
                res.flash('error', `Υπάρχει ήδη καταχωρημένο μέλος με το email ${email}.`);
                return res.redirect('/signin');
            }
            else {
                req.session.user = email;
                return res.render('index', { title: 'Βοηθός Προπονητή', logged: email });
            }
        });
    });
});
