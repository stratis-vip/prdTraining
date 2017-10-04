"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/control/classes/index");
const express = require("express");
const db_athlites_1 = require("../lib/models/db-athlites");
const router = express.Router();
exports.router = router;
const checkParam = (res, id) => {
    if (parseInt(id) === NaN) {
        return res.json({
            athletes: [],
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
        });
    }
};
/* GET athletes listing. */
router.get("/", (req, res) => {
    let db = new db_athlites_1.default();
    db.getAthites((err, all) => {
        if (err) {
            return res.json({ errors: { msg: err.code } });
        }
        else {
            return res.json({ athletes: all });
        }
    });
});
/* Βρες συγκεκριμένο μέλος */
router.get("/:id", (req, res) => {
    let db = new db_athlites_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db
        .findAthlitiById(id)
        .then(value => {
        if (value.isFound) {
            return res.json({ athletes: value.data });
        }
        else {
            return res.json({
                errors: { msg: "Δεν υπάρχει καταχωρημένος αθλητής" }
            });
        }
    })
        .catch(reason => {
        return res.json({ errors: { msg: reason } });
    });
});
/* Διέγραψε συγκεκριμένο μέλος */
router.delete("/:id", (req, res) => {
    let db = new db_athlites_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db.findAthlitiById(id).then(value => {
        if (value.isFound) {
            db
                .deleteAthlitiById(id)
                .then(affectedLines => {
                if (affectedLines > 0) {
                    return res.json({
                        athletes: []
                    });
                }
                else {
                    return res.json({
                        errors: {
                            msg: "Αποτυχία διαγραφής"
                        }
                    });
                }
            })
                .catch(reason => {
                return res.json({ errors: { msg: reason } });
            });
        }
    });
});
/* Καταχώρισε συγκεκριμένο μέλος */
router.post("/", (req, res) => {
    let db = new db_athlites_1.default();
    console.log(`email ${req.body.email} , pass ${req.body.pass}`);
    db.registerAthliti(req.body.email, req.body.pass, (err, all) => {
        if (err) {
            return res.json({ errors: { msg: err } });
        }
        else {
            return res.json({
                athletes: all.object
            });
        }
    });
});
/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
    let db = new db_athlites_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db
        .findAthlitiById(id)
        .then(value => {
        if (value.isFound) {
            let ath = new index_1.Athlete();
            ath.id = id;
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
                        athletes: []
                    });
                }
                else {
                    return res.json({
                        errors: { msg: "Αποτυχία Ενημέρωσης" }
                    });
                }
            })
                .catch(reason => {
                return res.json({
                    errors: { msg: reason }
                });
            });
        }
        else {
            return res.json({
                errors: { msg: "Δεν υπάρχει καταχωρημένος αθλητής" }
            });
        }
    })
        .catch(reason => {
        return res.json({
            errors: { msg: reason }
        });
    });
});
