import { promiseAnswer } from "../lib/models/interfaces";
import { Athlete } from "../lib/control/classes/index";
import * as express from "express";
import DBAthlete from "../lib/models/db-athlites";
import * as sql from "mysql";

const router = express.Router();

const checkParam = (res, id: any) => {
  if (parseInt(id) === NaN) {
    return res.json({
      athletes: [],
      error: true,
      message: "Δεν υπάρχει καταχωρημένος αθλητής"
    });
  }
};

router.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/vnd.api+json");
  next();
});

/* GET athletes listing. */
router.get("/", (req, res) => {
  let db = new DBAthlete();
  db.getAthites((err: sql.IError, all) => {
    if (err) {
      return res.json({ errors: { msg: err.code } });
    } else {
      return res.json({ data: all });
    }
  });
});

/* Βρες συγκεκριμένο μέλος */
router.get("/:id", (req, res) => {
  let db = new DBAthlete();
  let id = req.params.id;
  checkParam(res, id);
  db
    .findAthlitiById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        return res.json({ athletes: (value as promiseAnswer).data });
      } else {
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
  let db = new DBAthlete();
  let id = req.params.id;
  checkParam(res, id);
  db.findAthlitiById(id).then(value => {
    if ((value as promiseAnswer).isFound) {
      db
        .deleteAthlitiById(id)
        .then(affectedLines => {
          if (affectedLines > 0) {
            return res.json({
              athletes: []
            });
          } else {
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
  let db = new DBAthlete();
  console.log(`email ${req.body.email} , pass ${req.body.pass}`);
  db.registerAthliti(req.body.email, req.body.pass, (err, all) => {
    if (err) {
      return res.json({ errors: { msg: err } });
    } else {
      return res.json({
        athletes: (all as Athlete).object
      });
    }
  });
});

/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
  let db = new DBAthlete();
  let id = req.params.id;
  checkParam(res, id);
  db
    .findAthlitiById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        let ath = new Athlete();
        ath.id = id;
        ath.email = ((value as promiseAnswer).data[0] as Athlete).email;
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
            } else {
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
      } else {
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

export { router };
