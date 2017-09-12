"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("sqlite3");
const interfaces_1 = require("./interfaces");
const events_1 = require("events");
const classes_1 = require("../control/classes");
class DB extends events_1.EventEmitter {
    constructor(fname) {
        super();
        this._error = false;
        this._errors = [];
        this._steps = [];
        this.createTableAthletes = () => {
            return new Promise((resolve, reject) => {
                this._db.get(`CREATE TABLE 'athletes' (
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
            this._db.all(`SELECT * FROM athletes`, (err, rows) => {
                if (err) {
                    this._errors.push(new interfaces_1.answer(err.message, interfaces_1.actions.STOP_PROGRAM_ERROR));
                    this._error = true;
                    return callback(err, null);
                }
                else {
                    if (!rows) {
                        return callback(null);
                    }
                    let arr = new Array();
                    rows.forEach((row) => {
                        let a = new classes_1.Athlete();
                        a.id = row.id;
                        a.bday = new Date(row.bday);
                        a.name = row.name;
                        a.weight = row.weight;
                        a.height = row.height;
                        a.sex = row.sex;
                        let v = new classes_1.Vo2maxClass();
                        let varray = row.vo2max.split(',');
                        v.swimming = varray[0];
                        v.bicycling = varray[1];
                        v.running = varray[2];
                        a.vo2max = v;
                        arr.push(a);
                    });
                    return callback(null, arr);
                }
            });
        };
        this._Emiter = new events_1.EventEmitter();
        this._db = new sql.Database(fname, sql.OPEN_READWRITE | sql.OPEN_CREATE);
        checkIfTableExists(this._db, 'athletes')
            .then((value) => {
            this._steps.push(value);
            this._Emiter.emit('finish', this._steps);
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
}
exports.default = DB;
let checkIfTableExists = (db, tableName) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
        db.get(query, (err, row) => {
            if (err) {
                reject(new interfaces_1.answer(err.message, interfaces_1.actions.STOP_PROGRAM_ERROR));
            } // κάποιο λάθος παρουσιάστηκε
            else {
                if (row === undefined) {
                    reject(new interfaces_1.answer(`Table ${tableName} not exists`, interfaces_1.actions.ACTION_REQUIRED));
                } // ο πίνακας δεν υπάρχει
                else {
                    if (row.name === tableName) {
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