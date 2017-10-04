"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/control/classes/index");
const express = require("express");
const db_activities_1 = require("../lib/models/db-activities");
const router = express.Router();
exports.router = router;
const checkParam = (res, id) => {
    if (parseInt(id) === NaN) {
        return res.json({
            errors: [{ msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }]
        });
    }
};
router.get("/", (req, res, next) => {
    if (req.query.athleteId) {
        let db = new db_activities_1.default();
        let id = req.query.athleteId;
        checkParam(res, id);
        db
            .findActivityByAthletes(id)
            .then(value => {
            if (value.isFound) {
                return res.json({ activities: value.data });
            }
            else {
                return res.json({
                    errors: [{ msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }]
                });
            }
        })
            .catch(reason => {
            return res.json({ errors: [{ msg: reason }] });
        });
    }
    else {
        next();
    }
});
/* GET activities listing. */
router.get("/", (req, res) => {
    let db = new db_activities_1.default();
    db.getActivities((err, all) => {
        if (err) {
            return res.json({ errors: [{ msg: err.code }] });
        }
        else {
            return res.json({ activities: all });
        }
    });
});
/* Βρες συγκεκριμένο μέλος */
router.get("/:id", (req, res) => {
    let db = new db_activities_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db
        .findActivityById(id)
        .then(value => {
        if (value.isFound) {
            return res.json({ activities: value.data });
        }
        else {
            return res.json({
                errors: { msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }
            });
        }
    })
        .catch(reason => {
        return res.json({ errors: [{ msg: reason }] });
    });
});
/* Διέγραψε συγκεκριμένο μέλος */
router.delete("/:id", (req, res) => {
    let db = new db_activities_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db.findActivityById(id).then(value => {
        if (value.isFound) {
            db
                .deleteActivityById(id)
                .then(affectedLines => {
                if (affectedLines > 0) {
                    return res.json({
                        activities: []
                    });
                }
                else {
                    return res.json({
                        errors: [
                            {
                                msg: "Αποτυχία διαγραφής"
                            }
                        ]
                    });
                }
            })
                .catch(reason => {
                return res.json({ errors: [{ msg: reason }] });
            });
        }
    });
});
/* Καταχώρισε συγκεκριμένο μέλος */
router.post("/", (req, res) => {
    let db = new db_activities_1.default();
    let act = new index_1.Activity();
    //fill activity apo to ρε;.βοδυ
    //console.log(`email ${req.body.email} , pass ${req.body.pass}`);
    db.addActivity(act, (err, all) => {
        if (err) {
            return res.json({ errors: [{ msg: err }] });
        }
        else {
            return res.json({
                activities: all //.object
            });
        }
    });
});
/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
    let db = new db_activities_1.default();
    let id = req.params.id;
    checkParam(res, id);
    db
        .findActivityById(id)
        .then(value => {
        if (value.isFound) {
            let activ = new index_1.Activity();
            activ.id = id;
            // activ.email = ((value as promiseAnswer).data[0] as Activity).email;
            // console.log(`email ${req.body.lastName} , fanme ${req.body.name}`);
            // activ.fname = req.body.name || activ.fname;
            // activ.sname = req.body.lastName || activ.sname;
            // activ.weight = req.body.weight || activ.weight;
            // activ.height = req.body.height || activ.height;
            // activ.sex = req.body.sex || activ.sex;
            // activ.bday = new Date(req.body.bday) || activ.bday;
            db
                .updateActivityById(id, activ)
                .then(changedRows => {
                if (changedRows > 0) {
                    return res.json({
                        activities: []
                    });
                }
                else {
                    return res.json({
                        errors: [{ msg: "Αποτυχία Ενημέρωσης" }]
                    });
                }
            })
                .catch(reason => {
                return res.json({
                    errors: [{ msg: reason }]
                });
            });
        }
        else {
            return res.json({
                errors: [{ msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }]
            });
        }
    })
        .catch(reason => {
        return res.json({
            errors: [{ msg: reason }]
        });
    });
});
