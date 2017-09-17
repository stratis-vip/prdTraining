"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const check_1 = require("./check");
const router = express.Router();
exports.router = router;
/* GET home page. */
router.get('/', check_1.check, (req, res, next) => {
    res.render('index', { title: 'Βοηθός Προπονητή', logged: req.session.user });
    console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
});
router.post('/', (req, res, next) => {
    req.session.user = req.body.userName;
    console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
    console.log(JSON.stringify(req.body));
    res.render('index', { title: 'Βοηθός Προπονητή', logged: req.session.user });
});
