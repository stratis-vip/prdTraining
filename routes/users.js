"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/control/classes/index");
const express = require("express");
const database_1 = require("../lib/models/database");
const router = express.Router();
exports.router = router;
/* GET users listing. */
router.get("/", (req, res) => {
    let db = new database_1.default();
    db.getAthites((err, all) => {
        if (err) {
            return res.json({
                users: [],
                error: true,
                message: err.code
            });
        }
        else {
            return res.json({
                users: all,
                error: false,
                message: null
            });
        }
    });
});
router.get("/:id", (req, res) => {
    let db = new database_1.default();
    console.log(`id = ${parseInt(req.params.id)}`);
    if (parseInt(req.params.id) === NaN) {
        return res.json({
            users: [],
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
        });
    }
    db.findAthlitiById(parseInt(req.params.id), (err, isfound, all) => {
        if (err) {
            console.log(err);
            return res.json({
                users: [],
                error: true,
                message: err.code
            });
        }
        else {
            if (isfound) {
                return res.json({
                    users: all,
                    error: false,
                    message: null
                });
            }
            else {
                return res.json({
                    users: all,
                    error: true,
                    message: "Δεν υπάρχει καταχωρημένος αθλητής"
                });
            }
        }
    });
});
router.delete("/:id", (req, res) => {
    let db = new database_1.default();
    if (parseInt(req.params.id) === NaN) {
        return res.json({
            users: [],
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
        });
    }
    db.findAthlitiById(parseInt(req.params.id), (err, isfound, all) => {
        if (err) {
            console.log(err);
            return res.json({
                users: [],
                error: true,
                message: err.code
            });
        }
        else {
            if (isfound) {
                //delete
                db.deleteAthlitiById(parseInt(req.params.id), (err, number) => {
                    if (err) {
                        return res.json({
                            users: [],
                            error: true,
                            message: err
                        });
                    }
                    else {
                        if (number > 0) {
                            return res.json({
                                users: [],
                                error: false,
                                message: "Επιτυχία"
                            });
                        }
                        else {
                            return res.json({
                                users: [],
                                error: true,
                                message: "Αποτυχία διαγραφής"
                            });
                        }
                    }
                });
            }
            else {
                return res.json({
                    users: all,
                    error: true,
                    message: "Δεν υπάρχει καταχωρημένος αθλητής"
                });
            }
        }
    });
});
router.post("/", (req, res) => {
    let db = new database_1.default();
    console.log(`email ${req.body.email} , pass ${req.body.pass}`);
    db.registerAthliti(req.body.email, req.body.pass, (err, all) => {
        if (err) {
            return res.json({
                users: [],
                error: true,
                message: err
            });
        }
        else {
            return res.json({
                users: all.object,
                error: false,
                message: null
            });
        }
    });
});
router.put("/:id", (req, res) => {
    let db = new database_1.default();
    if (parseInt(req.params.id) === NaN) {
        return res.json({
            users: [],
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
        });
    }
    db.findAthlitiById(parseInt(req.params.id), (err, isfound, all) => {
        if (err) {
            console.log(err);
            return res.json({
                users: [],
                error: true,
                message: err.code
            });
        }
        else {
            if (isfound) {
                //delete
                let ath = new index_1.Athlete();
                ath = all[0];
                db.updateAthlitiById(parseInt(req.params.id), ath, (err, number) => {
                    if (err) {
                        return res.json({
                            users: [],
                            error: true,
                            message: err
                        });
                    }
                    else {
                        if (number > 0) {
                            return res.json({
                                users: [],
                                error: false,
                                message: "Επιτυχία"
                            });
                        }
                        else {
                            return res.json({
                                users: [],
                                error: true,
                                message: "Αποτυχία ανανέωσης"
                            });
                        }
                    }
                });
            }
            else {
                return res.json({
                    users: all,
                    error: true,
                    message: "Δεν υπάρχει καταχωρημένος αθλητής"
                });
            }
        }
    });
});
