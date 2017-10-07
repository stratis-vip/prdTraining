import {} from "../lib/control/classes/src/activity";
import { promiseAnswer } from "../lib/models/interfaces";
import { Activity } from "../lib/control/classes/index";
import * as express from "express";
import * as sql from "mysql";
import DBActivity from "../lib/models/db-activities";
import { hostAddress } from "../lib/control/consts";
import { errorDb, errorNotFoundObject, errorFoundDuplicateObject } from '../lib/control/errorfunctions';

const router = express.Router();

const checkParam = (res, req, id: any) => {
  if (isNaN(parseInt(id))) {
    errorNotFoundObject(res, req.originalUrl, "Λάθος αίτημα στον σέρβερ", 102);
    // res.json({
    //   errors: [
    //     {
    //       attribute: "test",
    //       message: "Δεν υπάρχει καταχωρημένη δραστηριότητα"
    //     }
    //   ]
    // });
    return false;
  } else {
    return true;
  }
};

router.use((req, res, next) => {
  res.set("Content-Type", "application/vnd.api+json");
  next();
});

//#region GET

/* GET activities listing. */
router.get("/", (req, res) => {
  let db = new DBActivity();
  db.getActivities((err: sql.IError, all) => {
    if (err) {
      return errorDb(res, "activities", err.message, 0);
    } else {
      return res.json({ data: all });
    }
  });
});

/* Βρες συγκεκριμένο μέλος */
router.get("/:id", (req, res) => {
  let db = new DBActivity();
  let id = req.params.id;
  if (!checkParam(res, req, id)) {
    return res.end();
  }
  db
    .findActivityById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        return res.json({ data: (value as promiseAnswer).data });
      } else {
        return errorNotFoundObject(
          res,
          req.originalUrl,
          "Δεν υπάρχει το αντικείμενο δραστηριότητας",
          101
        );
      }
    })
    .catch(reason => {
      return errorDb(res, `activities/${req.params.id}`, reason, 0);
    });
});

//#endregion

//#region DELETE
/* Διέγραψε συγκεκριμένο μέλος */
router.delete("/:id", (req, res) => {
  let db = new DBActivity();
  let id = req.params.id;
  if (!checkParam(res, req, id)) {
    return res.end();
  }

  db
    .findActivityById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        db
          .deleteActivityById(id)
          .then(affectedLines => {
            if (affectedLines > 0) {
              res.status(204);
              return res.end();
            } else {
              return errorDb(
                res,
                `activities/${req.params.id}`,
                "Αδυναμία Διαγραφής",
                2
              );
            }
          })
          .catch(reason => {
            return errorDb(res, `activities/${req.params.id}`, reason, 0);
          });
      } else {
        return errorNotFoundObject(
          res,
          req.originalUrl,
          "Δεν υπάρχει το αντικείμενο προς διαγραφή",
          101
        );
      }
    })
    .catch(reason => {
      return errorDb(res, `activities/${req.params.id}`, reason, 1);
    });
});

//#endregion
/* Καταχώρισε συγκεκριμένο μέλος */
router.post("/", (req, res) => {
  let db = new DBActivity();
  let act = new Activity();
  let b = req.body;
  act.athleteId = Number(b.athleteId);
  act.distance =  Number(b.distance);
  act.totalTime =  Number(b.totalTime);
  act.typeOfActivity =  b.typeOfActivity;
  act.name = b.name;
  //fill activity apo to ρε;.βοδυ
  //console.log(`email ${req.body.email} , pass ${req.body.pass}`);
  db.addActivity(act, (reason, all) => {
    if (reason) {
      return errorFoundDuplicateObject(res, `activities/${req.params.id || ""}`, reason, 103);
    } else {
      return res.json({
        data: all as Activity //.object
      });
    }
  });
});

/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
  let db = new DBActivity();
  let id = req.params.id;
  if (!checkParam(res, req, id)) {
    return res.end();
  }
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
            return errorDb(res, `activities/${req.params.id}`, reason, 0);
          });
      } else {
        return res.json({
          errors: [{ msg: "Δεν υπάρχει καταχωρημένη δραστηριότητα" }]
        });
      }
    })
    .catch(reason => {
      return errorDb(res, `activities/${req.params.id}`, reason, 0);
    });
});

export { router };
