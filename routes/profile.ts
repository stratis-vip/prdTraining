import * as express from "express";
import DB from "../lib/models/database";
import { Athlete } from "../lib/control/classes/index";
import * as validator from "validator";

const router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render("profile", { title: "Επεξεργασία προφίλ" });
});

router.get("/:id", (req, res, next) => {
  let db = new DB();
  let ath= new Athlete()
  ath= req.session.user;
  if ( ath.id !== Number(req.params.id)) {
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
        logged: athl[0] as Athlete
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

  let checkDb = new DB();
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
