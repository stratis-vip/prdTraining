"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const tcxparser_1 = require("../lib/control/parsers/tcxparser");
const router = express.Router();
exports.router = router;
let upload = multer({ dest: 'uploads' });
//  let storage = multer.memoryStorage()
//  let upload = multer({ storage: storage })
/* GET users listing. */
router.get('/', (req, res, next) => {
    res.render('imports', { logged: req.session.user });
});
router.post('/upload', upload.array('tcx'), (req, res, next) => {
    console.log('file ' + JSON.stringify(req.files));
    //  console.log('file '+req.file.buffer.toString())
    //console.log('ΒΟΔΥ = '+JSON.stringify(req.body))
    let act = null(req.files).forEach((element, value, index) => {
        tcxparser_1.getActivityFromFile(element.path, (err, activ) => {
            if (!err) {
                act.push(activ);
            }
            fs.unlink(element.path, (err) => {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            });
        }); //<--
    });
});
