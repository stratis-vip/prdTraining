"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dot = require("dotenv");
const sql = require("mysql");
const interfaces_1 = require("./interfaces");
const classes_1 = require("../control/classes");
const crypt = require("bcryptjs");
class DB {
    constructor() {
        this._error = false;
        this._errors = [];
        this._steps = [];
        this.end = () => {
            if (this._db) {
                this._db.end();
                this._db = null;
            }
        };
        this.createTableAthletes = () => {
            return new Promise((resolve, reject) => {
                this._db.query(`CREATE TABLE 'athletes' (
                    'id'	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    'name'	    TEXT NOT NULL DEFAULT 'Ανώνυμος  Αθλητής',
                    'weight'	REAL NOT NULL DEFAULT 75.0,
                    'height'	REAL NOT NULL DEFAULT 1.73,
                    'sex'	    INTEGER NOT NULL DEFAULT 0,
                    'bday'  	TEXT NOT NULL,
                    'vo2max'	TEXT NOT NULL)`, (err, row) => {
                    if (err) {
                        reject(new interfaces_1.answer(`${err.message}`, interfaces_1.actions.ACTION_REQUIRED));
                    }
                    else {
                        resolve(new interfaces_1.answer("Table created succesfully", interfaces_1.actions.NO_ACTION));
                    }
                });
            });
        };
        this.getAthites = callback => {
            if (!this._db) {
                this.createDBConnection();
            }
            this._db.query(`SELECT * FROM athletes`, (err, rows) => {
                if (err) {
                    console.log(`in athlites error query`);
                    this._errors.push(new interfaces_1.answer(err.message, interfaces_1.actions.STOP_PROGRAM_ERROR));
                    this._error = true;
                    return callback(err, null);
                }
                else {
                    console.log(`in rows athlites`);
                    if (!rows) {
                        return callback(null);
                    }
                    console.log(`before fill`);
                    let arr = this.fillAthlete(rows);
                    this.end();
                    return callback(null, arr);
                }
            });
        };
        this.fillAthlete = (rows) => {
            let arr = new Array();
            rows.forEach(row => {
                let a = new classes_1.Athlete();
                a.id = row.id;
                a.bday = new Date(row.bday);
                a.fname = row.fname;
                a.sname = row.sname;
                a.weight = row.weight;
                a.height = row.height;
                a.sex = row.sex;
                a.email = row.email;
                a.vo2max = JSON.parse(row.vo2max);
                a.pass = row.pass;
                arr.push(a.object);
            });
            return arr;
        };
        this.deleteAthlitiById = (AthleteId, callback) => {
            if (this._db === null) {
                this.createDBConnection();
            }
            this._db.query(`DELETE FROM athletes where id=${AthleteId}`, (err, results) => {
                if (err) {
                    callback(err, 0);
                }
                else {
                    callback(null, results.affectedRows);
                }
            });
        };
        this.updateAthlitiById = (AthleteId, ath, callback) => {
            if (this._db === null) {
                this.createDBConnection();
            }
            let da = new Date(ath.bday);
            let bday = da.toISOString().substr(0, 10);
            let que = `UPDATE athletes  SET email='${ath.email}', fname='${ath.fname}', sname='${ath.sname}', weight=${ath.weight}, 
    height= ${ath.height}, sex='${ath.sex}', bday='${bday}', vo2max='${JSON.stringify(ath.vo2max)}'  where id=${AthleteId}`;
            console.log(que);
            this._db.query(que, (err, rows) => {
                if (err) {
                    callback(err, null);
                }
                else {
                    callback(null, rows.changedRows);
                }
                this.end();
            });
        };
        this.findAthlitiById = (AthleteId, callback) => {
            if (this._db === null) {
                this.createDBConnection();
            }
            console.log(`SELECT * FROM athletes where id=${AthleteId}`);
            this._db.query(`SELECT * FROM athletes where id=${AthleteId}`, (err, rows) => {
                if (err) {
                    callback(err, null, null);
                }
                callback(null, rows.length === 1, this.fillAthlete(rows));
                this.end();
            });
        };
        /**
       * Βρίσκει τον αθλητή από το email του
       * @param {string} AthleteEmail το email του αθλητή
       * @return callback με 3 παραμέτρους
       * @param err Αν υπάρχει λάθος σύνδεσης, αλλιώς null
       * @param exists True αν υπάρχει, αλλιώς False
       * @param {Array<Athlete>} Athlete αντικείμενο πίνακα αθλητών με ένα στοιχείο του αθλητή, αλλιώς null
       */
        this.findAthlitiByMail = (AthleteEmail, callback) => {
            if (this._db === null) {
                this.createDBConnection();
            }
            this._db.query(`SELECT * FROM athletes where email='${AthleteEmail}'`, (err, rows) => {
                if (err) {
                    callback(err, null, null);
                }
                callback(null, rows.length === 1, this.fillAthlete(rows));
                this.end();
            });
        };
        this.signinQuery = (email, pass) => {
            let query = `INSERT INTO \`athletes\` (\`email\`, \`pass\`, \`fname\`, \`sname\`, \`weight\`, \`height\`, \`sex\`, \`bday\`, \`vo2max\`) VALUES
    
    ( '${email}', '${crypt.hashSync(pass)}', 'Ανώνυμος','Ανεπίθετος', 88.1, 1.73, 'SEX_MALE', '1971-10-21' , '{"running": 20, "swimming": 20, "bicycling": 20}')`;
            return query;
        };
        this.registerAthliti = (AthleteEmail, AthletePass, callback) => {
            if (this._db === null) {
                this.createDBConnection();
            }
            this.findAthlitiByMail(AthleteEmail, (err, isFound) => {
                if (err) {
                    callback(err, null);
                }
                else {
                    if (isFound) {
                        callback("Υπάρχει ήδη καταχωρημένος αθλητής με αυτό το email", null);
                    }
                    else {
                        if (this._db === null) {
                            this.createDBConnection();
                        }
                        this._db.query(this.signinQuery(AthleteEmail, AthletePass), (err, rows) => {
                            if (err) {
                                callback(err, null);
                            }
                            else {
                                let athlete = new classes_1.Athlete();
                                athlete.id = rows.insertId;
                                athlete.email = AthleteEmail;
                                callback(null, athlete);
                            }
                        });
                    }
                }
            });
        };
        dot.config();
        this.createDBConnection();
        checkIfTableExists(this._db, "athletes")
            .then(value => {
            this._steps.push(value);
            this.end();
        })
            .catch(value => {
            this._errors.push(value);
            switch (value.action) {
                case interfaces_1.actions.ACTION_REQUIRED:
                    this.createTableAthletes()
                        .then(value => {
                        this._error = false;
                        this._steps.push(value);
                    })
                        .catch(value => {
                        this._errors.push(value);
                    });
                    break;
                case interfaces_1.actions.STOP_PROGRAM_ERROR:
                    //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα
                    this._error = true;
                    break;
                case interfaces_1.actions.NO_ACTION:
            }
        });
    }
    get error() {
        return this._error;
    }
    get errors() {
        return this._errors;
    }
    get steps() {
        return this._steps;
    }
    createDBConnection() {
        this._db = sql.createConnection({
            host: process.env.HOST,
            user: process.env.DBUSER,
            password: process.env.PASS,
            database: process.env.DBASE
        });
        this._db.on("error", err => {
            console.log(`err`);
            this.end();
        });
    }
}
exports.default = DB;
let checkIfTableExists = (db, tableName) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT table_name as name FROM information_schema.tables where table_schema='${process
            .env.DBASE}' and TABLE_NAME = '${tableName}'`;
        db.query(query, (err, results, fields) => {
            if (err) {
                reject(new interfaces_1.answer(err.message, interfaces_1.actions.STOP_PROGRAM_ERROR));
            }
            else {
                // κάποιο λάθος παρουσιάστηκε
                if (results === undefined) {
                    reject(new interfaces_1.answer(`Table ${tableName} not exists`, interfaces_1.actions.ACTION_REQUIRED));
                }
                else {
                    // ο πίνακας δεν υπάρχει
                    if (results[0].name === tableName) {
                        resolve(new interfaces_1.answer("Table Exists", interfaces_1.actions.NO_ACTION));
                    }
                    else {
                        reject(new interfaces_1.answer(`Table ${tableName} not exists`, interfaces_1.actions.ACTION_REQUIRED));
                    }
                }
            }
        });
    });
};
/*
CREATE TABLE `activities` (
    `id`	        INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    `athleteId`	    INTEGER NOT NULL,
    `name`	        TEXT NOT NULL,
    `totalTime`	    NUMERIC NOT NULL,
    `distance`	    NUMERIC NOT NULL,
    `type`	        INTEGER NOT NULL DEFAULT 1,
    `subType`	    INTEGER NOT NULL DEFAULT 0,
    `recs`	        TEXT DEFAULT NULL,
    `HR`	        TEXT DEFAULT '0,0,0',
    `tiz`	        TEXT DEFAULT '10.1,20.2,30.3,35.3,4.1',
    `start`	        TEXT NOT NULL,
    `exoplismos`	TEXT DEFAULT NULL
); */
