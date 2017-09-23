"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.router = router;
/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log('in router.logout');
    req.session.user = null;
    res.flash('info', 'Αποσυνδέθηκε με επιτυχία');
    res.render('login', { title: 'Σύνδεση' });
});
