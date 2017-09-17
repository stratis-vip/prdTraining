"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
exports.router = router;
/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('login', { title: 'Είσοδος στον βοηθό Προπονητή' });
});
