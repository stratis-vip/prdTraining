"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/control/classes/index");
const express = require("express");
const database_1 = require("../lib/models/database");
const router = express.Router();
exports.router = router;
const checkParam = (res, id) => {
    if (parseInt(id) === NaN) {
        return res.json({
            users: [],
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
        });
    }
};
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
/* Βρες συγκεκριμένο μέλος */
router.get("/:id", (req, res) => {
    let db = new database_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db
        .findAthlitiById(id)
        .then(value => {
        if (value.isFound) {
            return res.json({
                users: value.data,
                error: false,
                message: null
            });
        }
        else {
            return res.json({
                users: value.data,
                error: true,
                message: "Δεν υπάρχει καταχωρημένος αθλητής"
            });
        }
    })
        .catch(reason => {
        return res.json({
            users: [],
            error: true,
            message: reason
        });
    });
});
/* Διέγραψε συγκεκριμένο μέλος */
router.delete("/:id", (req, res) => {
    let db = new database_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db.findAthlitiById(id).then(value => {
        if (value.isFound) {
            db
                .deleteAthlitiById(id)
                .then(affectedLines => {
                if (affectedLines > 0) {
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
            })
                .catch(reason => {
                return res.json({ users: [], error: true, message: reason });
            });
        }
    });
});
/* Καταχώρισε συγκεκριμένο μέλος */
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
/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
    let db = new database_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db
        .findAthlitiById(id)
        .then(value => {
        if (value.isFound) {
            let ath = new index_1.Athlete();
            ath.athleteId = id;
            ath.email = value.data[0].email;
            console.log(`email ${req.body.lastName} , fanme ${req.body.name}`);
            ath.fname = req.body.name || ath.fname;
            ath.sname = req.body.lastName || ath.sname;
            ath.weight = req.body.weight || ath.weight;
            ath.height = req.body.height || ath.height;
            ath.sex = req.body.sex || ath.sex;
            ath.bday = new Date(req.body.bday) || ath.bday;
            db
                .updateAthlitiById(id, ath)
                .then(changedRows => {
                if (changedRows > 0) {
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
                        message: "Αποτυχία Ενημέρωσης"
                    });
                }
            })
                .catch(reason => {
                return res.json({
                    users: [],
                    error: true,
                    message: reason
                });
            });
        }
        else {
            return res.json({
                users: [],
                error: true,
                message: "Δεν υπάρχει καταχωρημένος αθλητής"
            });
        }
    })
        .catch(reason => {
        return res.json({
            users: [],
            error: true,
            message: reason
        });
    });
});
