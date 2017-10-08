"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/control/classes/index");
const express = require("express");
const db_activities_1 = require("../lib/models/db-activities");
const errorfunctions_1 = require("../lib/control/errorfunctions");
const router = express.Router();
exports.router = router;
const checkParam = (res, req, id) => {
    if (isNaN(parseInt(id))) {
        errorfunctions_1.errorNotFoundObject(res, req.originalUrl, "Λάθος αίτημα στον σέρβερ", 102);
        // res.json({
        //   errors: [
        //     {
        //       attribute: "test",
        //       message: "Δεν υπάρχει καταχωρημένη δραστηριότητα"
        //     }
        //   ]
        // });
        return false;
    }
    else {
        return true;
    }
};
router.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", "application/vnd.api+json");
    next();
});
//#region GET
/* GET activities listing. */
router.get("/", (req, res) => {
    let db = new db_activities_1.default();
    db.getActivities((err, all) => {
        if (err) {
            return errorfunctions_1.errorDb(res, "activities", err.message, 0);
        }
        else {
            return res.json({ data: all });
        }
    });
});
/* Βρες συγκεκριμένο μέλος */
router.get("/:id", (req, res) => {
    let db = new db_activities_1.default();
    let id = req.params.id;
    if (!checkParam(res, req, id)) {
        return res.end();
    }
    db
        .findActivityById(id)
        .then(value => {
        if (value.isFound) {
            return res.json({ data: value.data });
        }
        else {
            return errorfunctions_1.errorNotFoundObject(res, req.originalUrl, "Δεν υπάρχει το αντικείμενο δραστηριότητας", 101);
        }
    })
        .catch(reason => {
        return errorfunctions_1.errorDb(res, `activities/${req.params.id}`, reason, 0);
    });
});
//#endregion
//#region DELETE
/* Διέγραψε συγκεκριμένο μέλος */
router.delete("/:id", (req, res) => {
    let db = new db_activities_1.default();
    let id = req.params.id;
    if (!checkParam(res, req, id)) {
        return res.end();
    }
    db
        .findActivityById(id)
        .then(value => {
        if (value.isFound) {
            db
                .deleteActivityById(id)
                .then(affectedLines => {
                if (affectedLines > 0) {
                    res.status(204);
                    return res.end();
                }
                else {
                    return errorfunctions_1.errorDb(res, `activities/${req.params.id}`, "Αδυναμία Διαγραφής", 2);
                }
            })
                .catch(reason => {
                return errorfunctions_1.errorDb(res, `activities/${req.params.id}`, reason, 0);
            });
        }
        else {
            return errorfunctions_1.errorNotFoundObject(res, req.originalUrl, "Δεν υπάρχει το αντικείμενο προς διαγραφή", 101);
        }
    })
        .catch(reason => {
        return errorfunctions_1.errorDb(res, `activities/${req.params.id}`, reason, 1);
    });
});
//#endregion
/* Καταχώρισε συγκεκριμένο μέλος */
router.post("/", (req, res) => {
    let db = new db_activities_1.default();
    let act = new index_1.Activity();
    let b = req.body;
    act.athleteId = Number(b.athleteId);
    act.distance = Number(b.distance);
    act.totalTime = Number(b.totalTime);
    act.typeOfActivity = b.typeOfActivity;
    act.name = b.name;
    //fill activity apo to ρε;.βοδυ
    //console.log(`email ${req.body.email} , pass ${req.body.pass}`);
    db.addActivity(act, (reason, all) => {
        if (reason) {
            return errorfunctions_1.errorFoundDuplicateObject(res, `activities/${req.params.id || ""}`, reason, 103);
        }
        else {
            return res.json({
                data: all //.object
            });
        }
    });
});
/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
    let db = new db_activities_1.default();
    let id = req.params.id;
    if (!checkParam(res, req, id)) {
        return res.end();
    }
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
                return errorfunctions_1.errorDb(res, `activities/${req.params.id}`, reason, 0);
            });
        }
        else {
            return res.json({
                errors: [{ msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }]
            });
        }
    })
        .catch(reason => {
        return errorfunctions_1.errorDb(res, `activities/${req.params.id}`, reason, 0);
    });
});
