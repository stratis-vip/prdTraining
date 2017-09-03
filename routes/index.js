"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.router = router;
/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Βοηθός Προπονητή' });
    console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
});
router.post('/', (req, res, next) => {
    req.session.user = req.body.userName;
    console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
    console.log(JSON.stringify(req.body));
    res.render('index', { title: 'Express', logged: req.session.user });
});
