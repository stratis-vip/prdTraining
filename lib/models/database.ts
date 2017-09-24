import * as dot from "dotenv";
import * as sql from "mysql";
import { actions, answer } from "./interfaces";
import { EventEmitter } from "events";
import { Athlete, Vo2maxClass } from "../control/classes";
import * as crypt from "bcryptjs";


export default class DB extends EventEmitter {
  private _db: sql.IConnection;
  private _error: boolean = false;
  private _errors: Array<answer> = [];
  private _steps: Array<answer> = [];
  private _Emiter: EventEmitter;
  constructor() {
    super();
    dot.config();
    this._Emiter = new EventEmitter();

    this.createDBConnection();

    checkIfTableExists(this._db, "athletes")
      .then(value => {
        this._steps.push(value);
        this._Emiter.emit("finish", this._steps);
        this.end();
      })
      .catch(value => {
        this._errors.push(value);
        switch (value.action) {
          case actions.ACTION_REQUIRED:
            this.createTableAthletes()
              .then(value => {
                this._error = false;
                this._steps.push(value);
                this._Emiter.emit("finish", this._steps);
              })
              .catch(value => {
                this._errors.push(value);
                this._Emiter.emit("error", this._errors);
              });
            break;
          case actions.STOP_PROGRAM_ERROR:
            //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα
            this._error = true;
            this._Emiter.emit("error", this._errors);
            break;
          case actions.NO_ACTION:
        }
      });
  }

  end = () => {
    if (this._db) {
      this._db.end();
      this._db = null;
    }
  };

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
      this._db.query(
        `CREATE TABLE 'athletes' (
                    'id'	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                    'name'	    TEXT NOT NULL DEFAULT 'Ανώνυμος  Αθλητής',
                    'weight'	REAL NOT NULL DEFAULT 75.0,
                    'height'	REAL NOT NULL DEFAULT 1.73,
                    'sex'	    INTEGER NOT NULL DEFAULT 0,
                    'bday'  	TEXT NOT NULL,
                    'vo2max'	TEXT NOT NULL)`,
        (err: sql.IError, row: any) => {
          if (err) {
            reject(new answer(`${err.message}`, actions.ACTION_REQUIRED));
          } else {
            resolve(new answer("Table created succesfully", actions.NO_ACTION));
          }
        }
      );
    });
  };

  getAthites = callback => {
    if (!this._db) {
      this.createDBConnection();
    }
    this._db.query(`SELECT * FROM athletes`, (err: sql.IError, rows: any) => {
      if (err) {
        console.log(`in athlites error query`);
        this._errors.push(new answer(err.message, actions.STOP_PROGRAM_ERROR));
        this._error = true;
        return callback(err, null);
      } else {
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

  private fillAthlete = (rows: Array<any>): Array<Athlete> => {
    let arr = new Array<Athlete>();
    rows.forEach(row => {
      let a = new Athlete();
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
      arr.push(a);
    });
    return arr;
  };

  findAthlitiById = (AthleteId: number, callback) => {
    this._db.query(
      `SELECT * FROM athletes where id=${AthleteId}`,
      (err: sql.IError, rows: any) => {
        if (err) {
          callback(err, null, null);
        }
        callback(
          null,
          (rows as Array<any>).length === 1,
          this.fillAthlete(rows)
        );
        this.end();
      }
    );
  };

  /**
 * Βρίσκει τον αθλητή από το email του
 * @param {string} AthleteEmail το email του αθλητή
 * @return callback με 3 παραμέτρους
 * @param err Αν υπάρχει λάθος σύνδεσης, αλλιώς null
 * @param exists True αν υπάρχει, αλλιώς False
 * @param {Array<Athlete>} Athlete αντικείμενο πίνακα αθλητών με ένα στοιχείο του αθλητή, αλλιώς null
 */
  findAthlitiByMail = (AthleteEmail: string, callback) => {
    if (this._db === null){
      this.createDBConnection()
    }
    this._db.query(
      `SELECT * FROM athletes where email='${AthleteEmail}'`,
      (err: sql.IError, rows: any) => {
        if (err) {
          callback(err, null, null);
        }
        callback(
          null,
          (rows as Array<any>).length === 1,
          this.fillAthlete(rows)
        );
        this.end();
      }
    );
  };

  private createDBConnection() {
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

  private signinQuery = (email: string, pass: string): string => {
    let query = `INSERT INTO \`athletes\` (\`email\`, \`pass\`, \`fname\`, \`sname\`, \`weight\`, \`height\`, \`sex\`, \`bday\`, \`vo2max\`) VALUES
    
    ( '${email}', '${crypt.hashSync(
      pass
    )}', 'Ανώνυμος','Ανεπίθετος', 88.1, 1.73, 'SEX_MALE', '1971-10-21' , '{"running": 20, "swimming": 20, "bicycling": 20}')`;
    return query;
  };

  registerAthliti = (AthleteEmail: string, AthletePass: string, callback) => {
    if (this._db === null){
      this.createDBConnection()
    }
    this._db.query(this.signinQuery(AthleteEmail, AthletePass), (err, rows) => {
      if (err) {
        callback(err, null);
      } else {
        let athlete = new Athlete();
        athlete.id = rows.insertId
        athlete.email = AthleteEmail
        callback(null, athlete);
      }
    });
  };
}

let checkIfTableExists = (
  db: sql.IConnection,
  tableName: string
): Promise<answer> => {
  return new Promise((resolve, reject) => {
    let query: string = `SELECT table_name as name FROM information_schema.tables where table_schema='${process
      .env.DBASE}' and TABLE_NAME = '${tableName}'`;
    db.query(
      query,
      (err: sql.IError, results: any, fields: sql.IFieldInfo[]) => {
        if (err) {
          reject(new answer(err.message, actions.STOP_PROGRAM_ERROR));
        } else {
          // κάποιο λάθος παρουσιάστηκε
          if (results === undefined) {
            reject(
              new answer(
                `Table ${tableName} not exists`,
                actions.ACTION_REQUIRED
              )
            );
          } else {
            // ο πίνακας δεν υπάρχει
            if (results[0].name === tableName) {
              resolve(new answer("Table Exists", actions.NO_ACTION));
            } else {
              reject(
                new answer(
                  `Table ${tableName} not exists`,
                  actions.ACTION_REQUIRED
                )
              );
            }
          }
        }
      }
    );
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
