"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dot = require("dotenv");
const sql = require("mysql");
const interfaces_1 = require("./interfaces");
const events_1 = require("events");
const classes_1 = require("../control/classes");
class DB extends events_1.EventEmitter {
    constructor() {
        super();
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
        this.getAthites = (callback) => {
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
                    let arr = this.fillAthlete(rows);
                    this.end();
                    return callback(null, arr);
                }
            });
        };
        this.fillAthlete = (rows) => {
            let arr = new Array();
            rows.forEach((row) => {
                let a = new classes_1.Athlete();
                a.id = row.id;
                a.bday = new Date(row.bday);
                a.name = row.name;
                a.weight = row.weight;
                a.height = row.height;
                a.sex = row.sex;
                a.email = row.email;
                a.vo2max = JSON.parse(row.vo2max);
                a.pass = row.pass;
                arr.push(a);
            });
            return arr;
        };
        this.findAthlitiById = (AthleteId, callback) => {
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
            this._db.query(`SELECT * FROM athletes where email='${AthleteEmail}'`, (err, rows) => {
                if (err) {
                    callback(err, null, null);
                }
                callback(null, rows.length === 1, this.fillAthlete(rows));
                this.end();
            });
        };
        dot.config();
        this._Emiter = new events_1.EventEmitter();
        this.createDBConnection();
        checkIfTableExists(this._db, 'athletes')
            .then((value) => {
            this._steps.push(value);
            this._Emiter.emit('finish', this._steps);
            this.end();
        })
            .catch((value) => {
            this._errors.push(value);
            switch (value.action) {
                case interfaces_1.actions.ACTION_REQUIRED:
                    this.createTableAthletes()
                        .then((value) => {
                        this._error = false;
                        this._steps.push(value);
                        this._Emiter.emit('finish', this._steps);
                    })
                        .catch((value) => {
                        this._errors.push(value);
                        this._Emiter.emit('error', this._errors);
                    });
                    break;
                case interfaces_1.actions.STOP_PROGRAM_ERROR:
                    //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα
                    this._error = true;
                    this._Emiter.emit('error', this._errors);
                    break;
                case interfaces_1.actions.NO_ACTION:
            }
        });
    }
    get Emiter() {
        return this._Emiter;
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
        this._db.on('error', (err) => {
            console.log(`err`);
            this.end();
        });
    }
}
exports.default = DB;
let checkIfTableExists = (db, tableName) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT table_name as name FROM information_schema.tables where table_schema='${process.env.DBASE}' and TABLE_NAME = '${tableName}'`;
        db.query(query, (err, results, fields) => {
            if (err) {
                reject(new interfaces_1.answer(err.message, interfaces_1.actions.STOP_PROGRAM_ERROR));
            } // κάποιο λάθος παρουσιάστηκε
            else {
                if (results === undefined) {
                    reject(new interfaces_1.answer(`Table ${tableName} not exists`, interfaces_1.actions.ACTION_REQUIRED));
                } // ο πίνακας δεν υπάρχει
                else {
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
