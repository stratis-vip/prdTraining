import * as express from "express";

import { Athlete } from "../lib/control/classes/index";
import * as validator from "validator";
import DBAthlete from "../lib/models/db-athlites";

const router = express.Router();

router.get("/", (req, res, next) => {
        console.log(JSON.stringify(req.session.user)) 
        res.render("profile", {
        title: "Επεξεργασία Προφίλ",
        logged: req.session.user 
      })
    }
  )

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

  let checkDb = new DBAthlete();
  checkDb.findAthlitiByMail(email, (err, exists) => {
    if (err) {
      res.flash(
        "error",
        `Η Βάση Δεδομένων φαίνεται να είναι εκτός λειτουργίας.\nΠαρακαλώ ενημερώστε τον διαχειριστή του προγράμματος!`
      );
      return res.redirect("/signin");
    }
    if (exists) {
      res.flash(
        "error",
        `Υπάρχει ήδη καταχωρημένο μέλος με το email ${email}.`
      );
      return res.redirect("/signin");
    }
    checkDb.registerAthliti(email, pass, (err, athl) => {
      if (err) {
        res.flash(
          "error",
          `Υπάρχει ήδη καταχωρημένο μέλος με το email ${email}.`
        );
        return res.redirect("/signin");
      } else {
        req.session.user = athl as Athlete;
        req.session.userid= athl.id
        res.render("profile", {
          title: "Επεξεργασία Προφίλ",
          logged: athl as Athlete
        });
        next();
      }
    });
  });
});

export { router };
