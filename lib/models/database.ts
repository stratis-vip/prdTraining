import * as dot from 'dotenv';
import * as sql from 'sqlite3';
import { actions, answer } from './interfaces';
import { EventEmitter } from 'events';
import { Athlete, Vo2maxClass } from '../control/classes'

export default class DB extends EventEmitter {
    private _db: sql.Database;
    private _error: boolean = false;
    private _errors: Array<answer> = [];
    private _steps: Array<answer> = [];
    private _Emiter: EventEmitter;
    constructor(fname) {
        super();
        this._Emiter = new EventEmitter();
        this._db = new sql.Database(fname, sql.OPEN_READWRITE | sql.OPEN_CREATE);
        checkIfTableExists(this._db, 'athletes')
            .then((value) => {
                this._steps.push(value);
                this._Emiter.emit('finish', this._steps);
            })
            .catch((value) => {
                this._errors.push(value);
                switch (value.action) {
                    case actions.ACTION_REQUIRED:
                        this.createTableAthletes()
                            .then((value) => {
                                this._error = false;
                                this._steps.push(value);
                                this._Emiter.emit('finish', this._steps);
                            })
                            .catch((value) => {
                                this._errors.push(value);
                                this._Emiter.emit('error', this._errors);
                            })
                        break;
                    case actions.STOP_PROGRAM_ERROR:

                        //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα
                        this._error = true;
                        this._Emiter.emit('error', this._errors);
                        break;
                    case actions.NO_ACTION:
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

    createTableAthletes = (): Promise<answer> => {
        return new Promise((resolve, reject) => {
            this._db.get(`CREATE TABLE 'athletes' (
                    'id'	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    'name'	    TEXT NOT NULL DEFAULT 'Ανώνυμος  Αθλητής',
                    'weight'	REAL NOT NULL DEFAULT 75.0,
                    'height'	REAL NOT NULL DEFAULT 1.73,
                    'sex'	    INTEGER NOT NULL DEFAULT 0,
                    'bday'  	TEXT NOT NULL,
                    'vo2max'	TEXT NOT NULL)`,
                (err: Error | null, row: any) => {
                    if (err) {
                        reject(new answer(`${err.message}`, actions.ACTION_REQUIRED));
                    } else {
                        resolve(new answer("Table created succesfully", actions.NO_ACTION))
                    }

                }
            );
        })
    }

    getAthites = (callback) => {
        this._db.all(`SELECT * FROM athletes`, (err: Error | null, rows: any) => {
            if (err) {
                this._errors.push(new answer(err.message, actions.STOP_PROGRAM_ERROR));
                this._error = true;
                return callback(err, null);
            } else {
                if (!rows) { return callback(null) }
                let arr = new Array<Athlete>();
                rows.forEach((row) => {
                    let a = new Athlete();
                    a.id = row.id;
                    a.bday = new Date(row.bday);
                    a.name = row.name;
                    a.weight = row.weight;
                    a.height = row.height;
                    a.sex = row.sex;
                    let v = new Vo2maxClass();
                    let varray = row.vo2max.split(',');
                    v.swimming = varray[0];
                    v.bicycling = varray[1];
                    v.running = varray[2];
                    a.vo2max = v;
                    arr.push(a);
                })
                return callback(null, arr);
            }
        })
    }
}

let checkIfTableExists = (db: sql.Database, tableName: string): Promise<answer> => {
    return new Promise((resolve, reject) => {
        let query: string = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
        db.get(query, (err: Error | null, row: any) => {
            if (err) { reject(new answer(err.message, actions.STOP_PROGRAM_ERROR)); } // κάποιο λάθος παρουσιάστηκε
            else {
                if (row === undefined) {
                    reject(new answer(`Table ${tableName} not exists`, actions.ACTION_REQUIRED));
                } // ο πίνακας δεν υπάρχει
                else {
                    if (row.name === tableName) {
                        resolve(new answer("Table Exists", actions.NO_ACTION));
                    }
                    else { reject(new answer(`Table ${tableName} not exists`, actions.ACTION_REQUIRED)) }
                }
            }
        });
    });
}


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