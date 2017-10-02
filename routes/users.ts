import { Athlete } from "../lib/control/classes/index";
import * as express from "express";
import DB from "../lib/models/database";
import * as sql from "mysql";
import Athlete from '../lib/control/classes/src/athlete';

const router = express.Router();

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

router.get("/:id", (req, res) => {
  let db = new DB();
  console.log(`id = ${parseInt(req.params.id)}`);
  if (parseInt(req.params.id) === NaN) {
    return res.json({
      users: [],
      error: true,
      message: "Δεν υπάρχει καταχωρημένος αθλητής"
    });
  }
  db.findAthlitiById(
    parseInt(req.params.id),
    (err: sql.IError, isfound, all) => {
      if (err) {
        console.log(err);
        return res.json({
          users: [],
          error: true,
          message: err.code
        });
      } else {
        if (isfound) {
          return res.json({
            users: all,
            error: false,
            message: null
          });
        } else {
          return res.json({
            users: all,
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
          });
        }
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  let db = new DB();
  if (parseInt(req.params.id) === NaN) {
    return res.json({
      users: [],
      error: true,
      message: "Δεν υπάρχει καταχωρημένος αθλητής"
    });
  }
  db.findAthlitiById(
    parseInt(req.params.id),
    (err: sql.IError, isfound, all) => {
      if (err) {
        console.log(err);
        return res.json({
          users: [],
          error: true,
          message: err.code
        });
      } else {
        if (isfound) {
          //delete
          db.deleteAthlitiById(parseInt(req.params.id), (err, number) => {
            if (err) {
              return res.json({
                users: [],
                error: true,
                message: err
              });
            } else {
              if (number > 0) {
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
            }
          });
        } else {
          return res.json({
            users: all,
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
          });
        }
      }
    }
  );
});

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

router.put("/:id", (req,res)=>{
  let db = new DB();
  if (parseInt(req.params.id) === NaN) {
    return res.json({
      users: [],
      error: true,
      message: "Δεν υπάρχει καταχωρημένος αθλητής"
    });
  } 
  db.findAthlitiById(
    parseInt(req.params.id),
    (err: sql.IError, isfound, all) => {
      if (err) {
        console.log(err);
        return res.json({
          users: [],
          error: true,
          message: err.code
        });
      } else {
        if (isfound) {
          //delete
          let ath = new Athlete();
          ath=all[0];
          
          db.updateAthlitiById(parseInt(req.params.id), ath, (err, number) => {
            if (err) {
              return res.json({
                users: [],
                error: true,
                message: err
              });
            } else {
              if (number > 0) {
                return res.json({
                  users: [],
                  error: false,
                  message: "Επιτυχία"
                });
              } else {
                return res.json({
                  users: [],
                  error: true,
                  message: "Αποτυχία ανανέωσης"
                });
              }
            }
          });
        } else {
          return res.json({
            users: all,
            error: true,
            message: "Δεν υπάρχει καταχωρημένος αθλητής"
          });
        }
      }
    }
  ); 
})
export { router };
