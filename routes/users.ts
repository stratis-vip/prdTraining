import { promiseAnswer } from '../lib/models/interfaces';
import { Athlete } from "../lib/control/classes/index";
import * as express from "express";
import DB from "../lib/models/database";
import * as sql from "mysql";


const router = express.Router();

const checkParam = (res, id: any) => {
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
  let db = new DB();
  db.getAthites((err: sql.IError, all) => {
    if (err) {
      return res.json({
        users: [],
        error: true,
        message: err.code
      });
    } else {
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
  let db = new DB();
  let id = req.params.id;
  checkParam(res, id);
  db
    .findAthlitiById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        return res.json({
          users: (value as promiseAnswer).data,
          error: false,
          message: null
        });
      } else {
        return res.json({
          users: (value as promiseAnswer).data,
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
  let db = new DB();
  let id = req.params.id;
  checkParam(res, id);
  db.findAthlitiById(id).then(value => {
    if ((value as promiseAnswer).isFound) {
      db
        .deleteAthlitiById(id)
        .then(affectedLines => {
          if (affectedLines > 0) {
            return res.json({
              users: [],
              error: false,
              message: "Επιτυχία"
            });
          } else {
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
  let db = new DB();
  console.log(`email ${req.body.email} , pass ${req.body.pass}`);
  db.registerAthliti(req.body.email, req.body.pass, (err, all) => {
    if (err) {
      return res.json({
        users: [],
        error: true,
        message: err
      });
    } else {
      return res.json({
        users: (all as Athlete).object,
        error: false,
        message: null
      });
    }
  });
});

/* Άλλαξε συγκεκριμένο μέλος */
router.put("/:id", (req, res) => {
  let db = new DB();
  let id = req.params.id;
  checkParam(res, id);
  db
    .findAthlitiById(id)
    .then(value => {
      if ((value as promiseAnswer).isFound) {
        let ath = new Athlete();
        ath.id = id;
        ath.email = ((value as promiseAnswer).data[0] as Athlete).email
        console.log(`email ${req.body.lastName} , fanme ${req.body.name}`);
        ath.fname = req.body.name  || ath.fname;
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
            } else {
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
      } else {
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

export { router };
