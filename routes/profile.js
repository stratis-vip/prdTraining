"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const database_1 = require("../lib/models/database");
const index_1 = require("../lib/control/classes/index");
const validator = require("validator");
const router = express.Router();
exports.router = router;
/* GET users listing. */
router.get("/", (req, res, next) => {
    res.render("profile", { title: "Επεξεργασία προφίλ" });
});
router.get("/:id", (req, res, next) => {
    let db = new database_1.default();
    let ath = new index_1.Athlete();
    ath = req.session.user;
    if (ath._id !== Number(req.params.id)) {
        res.render("error", {
            message: "Δεν έχετε δικαίωμα να τροποποιήσετε άλλο προφίλ"
        });
    }
    db.findAthlitiById(Number(req.params.id), (err, istrue, athl) => {
        if (err) {
            return next();
        }
        if (istrue) {
            res.render("profile", {
                title: "Επεξεργασία Προφίλ",
                logged: athl[0]
            });
        }
    });
});
router.post("/", (req, res, next) => {
    let email = req.body.email;
    let pass = req.body.password;
    let confPass = req.body.confirmpassword;
    if (!validator.isEmail(email)) {
        res.flash("error", `Πρέπει να δωθεί έγκυρη διεύθυνση email`);
        return res.redirect("/signin");
    }
    if (validator.isEmpty(pass) || validator.isEmpty(confPass)) {
        res.flash("error", `Πρέπει να δωθεί password`);
        return res.redirect("/signin");
    }
    if (pass !== confPass) {
        res.flash("error", `Τα συνθηματικά δεν ταιριάζουν`);
        return res.redirect("/signin");
    }
    let checkDb = new database_1.default();
    checkDb.findAthlitiByMail(email, (err, exists) => {
        if (err) {
            res.flash("error", `Η Βάση Δεδομένων φαίνεται να είναι εκτός λειτουργίας.\nΠαρακαλώ ενημερώστε τον διαχειριστή του προγράμματος!`);
            return res.redirect("/signin");
        }
        if (exists) {
            res.flash("error", `Υπάρχει ήδη καταχωρημένο μέλος με το email ${email}.`);
            return res.redirect("/signin");
        }
        checkDb.registerAthliti(email, pass, (err, athl) => {
            if (err) {
                res.flash("error", `Υπάρχει ήδη καταχωρημένο μέλος με το email ${email}.`);
                return res.redirect("/signin");
            }
            else {
                req.session.user = athl;
                res.render("profile", {
                    title: "Επεξεργασία Προφίλ",
                    logged: athl
                });
                next();
            }
        });
    });
});
