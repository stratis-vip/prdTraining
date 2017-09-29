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
    //  console.log('file '+req.file.buffer.toString())
    //console.log('ΒΟΔΥ = '+JSON.stringify(req.body))
    let act = new Array();
    req.files.forEach((element, index) => {
        tcxparser_1.getActivityFromFile(element.path, (err, activ) => {
            if (!err) {
                act.push(activ);
                //   req.body.form.on('progress', function(bytesReceived, bytesExpected) {
                //     console.log(((bytesReceived / bytesExpected)*100) + "% uploaded");
                // });    
                if (Number(index) === (req.files.length - 1)) {
                    res.render('imports', { logged: req.session.user, activity: act });
                }
            }
            fs.unlink(element.path, (err) => {
                if (err) {
                    console.log(JSON.stringify(err));
                }
            });
        }); //<--
    });
});
