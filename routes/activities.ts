import {} from "../lib/control/classes/src/activity";
import { promiseAnswer } from "../lib/models/interfaces";
import { Activity } from "../lib/control/classes/index";
import * as express from "express";
import * as sql from "mysql";
import DBActivity from "../lib/models/db-activities";

const router = express.Router();

const checkParam = (res, id: any) => {
  if (parseInt(id) === NaN) {
    return res.json({
      errors: [{ msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }]
    });
  }
};

router.get("/", (req, res, next) => {
  if (req.query.athleteId) {
    let db = new DBActivity();
    let id = req.query.athleteId;
    checkParam(res, id);
    db
      .findActivityByAthletes(id)
      .then(value => {
        if ((value as promiseAnswer).isFound) {
          return res.json({ activities: (value as promiseAnswer).data });
        } else {
          return res.json({
            errors: [{ msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }]
          });
        }
      })
      .catch(reason => {
        return res.json({ errors: [{ msg: reason }] });
      });
  } else {
    next();
  }
});

/* GET activities listing. */
router.get("/", (req, res) => {
  let db = new DBActivity();
  db.getActivities((err: sql.IError, all) => {
    if (err) {
      return res.json({ errors: [{ msg: err.code }] });
    } else {
      return res.json({ activities: all });
    }
  });
});

/* Βρες συγκεκριμένο μέλος */
router.get("/:id", (req, res) => {
  let db = new DBActivity();
  let id = req.params.id;
  checkParam(res, id);
  db
    .findActivityById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        return res.json({ activities: (value as promiseAnswer).data });
      } else {
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
  let db = new DBActivity();
  let id = req.params.id;
  checkParam(res, id);
  db.findActivityById(id).then(value => {
    if ((value as promiseAnswer).isFound) {
      db
        .deleteActivityById(id)
        .then(affectedLines => {
          if (affectedLines > 0) {
            return res.json({
              activities: []
            });
          } else {
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
  let db = new DBActivity();
  let act = new Activity();
  //fill activity apo to ρε;.βοδυ
  //console.log(`email ${req.body.email} , pass ${req.body.pass}`);
  db.addActivity(act, (err, all) => {
    if (err) {
      return res.json({ errors: [{ msg: err }] });
    } else {
      return res.json({
        activities: all as Activity //.object
      });
    }
  });
});

/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
  let db = new DBActivity();
  let id = req.params.id;
  checkParam(res, id);
  db
    .findActivityById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        let activ = new Activity();
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
            } else {
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
      } else {
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

export { router };
