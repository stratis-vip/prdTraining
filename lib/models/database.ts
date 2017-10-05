import * as dot from "dotenv";
import * as sql from "mysql";
import { actions, answer, promiseAnswer } from "./interfaces";

export default class DB {
  protected _db: sql.IConnection;
  private _error: boolean = false;
  private _errors: Array<answer> = [];
  private _steps: Array<answer> = [];

  constructor() {
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
          case actions.ACTION_REQUIRED:
            this.createTableAthletes()
              .then(value => {
                this._error = false;
                this._steps.push(value);
              })
              .catch(value => {
                this._errors.push(value);
              });
            break;
          case actions.STOP_PROGRAM_ERROR:
            //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα
            this._error = true;

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

  // getAthites = callback => {
  //   if (!this._db) {
  //     this.createDBConnection();
  //   }
  //   this._db.query(`SELECT * FROM athletes`, (err: sql.IError, rows: any) => {
  //     if (err) {
  //       console.log(`in athlites error query`);
  //       this._errors.push(new answer(err.message, actions.STOP_PROGRAM_ERROR));
  //       this._error = true;
  //       return callback(err, null);
  //     } else {
  //       console.log(`in rows athlites`);
  //       if (!rows) {
  //         return callback(null);
  //       }
  //       console.log(`before fill`);
  //       let arr = this.fillAthlete(rows);
  //       this.end();

  //       return callback(null, arr);
  //     }
  //   });
  // };

  // private fillAthlete = (rows: Array<any>): Array<{}> => {
  //   let arr = new Array<{}>();
  //   rows.forEach(row => {
  //     let a = new Athlete();
  //     a.id = row.id;
  //     a.bday = new Date(row.bday);
  //     a.fname = row.fname;
  //     a.sname = row.sname;
  //     a.weight = row.weight;
  //     a.height = row.height;
  //     a.sex = row.sex;
  //     a.email = row.email;
  //     a.vo2max = JSON.parse(row.vo2max);
  //     a.pass = row.pass;
  //     arr.push(a.object);
  //   });
  //   console.log(`DATABASE SEND \n${JSON.stringify(arr,null,2)}`);
  //   return arr;
  // };

//   updateAthlitiById = (AthleteId: number, ath: Athlete) => {
//     return new Promise((resolve, reject) => {
//       if (this._db === null) {
//         this.createDBConnection();
//       }
//       let da = new Date(ath.bday);
//       let bday = da.toISOString().substr(0, 10);
//       let que = `UPDATE athletes  SET email='${ath.email}', fname='${ath.fname}', sname='${ath.sname}', weight=${ath.weight}, 
//     height= ${ath.height}, sex='${ath.sex}', bday='${bday}', vo2max='${JSON.stringify(
//         ath.vo2max
//       )}'  where id=${AthleteId}`;
//       console.log(que);
//       this._db.query(que, (err: sql.IError, rows: any) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(rows.changedRows);
//         }
//         this.end();
//       });
//     });
//   };

//   deleteAthlitiById = (AthleteId: number) => {
//     return new Promise((resolve, reject) => {
//       if (this._db === null) {
//         this.createDBConnection();
//       }
//       this._db.query(
//         `DELETE FROM athletes where id=${AthleteId}`,
//         (err: sql.IError, results: any) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(results.affectedRows);
//           }
//         }
//       );
//     });
//   };

//   findAthlitiById = (athleteId: number) => {
//     return new Promise((resolve, reject) => {
//       if (this._db === null) {
//         this.createDBConnection();
//       }
//       this._db.query(
//         `SELECT * FROM athletes where id=${athleteId}`,
//         (err: sql.IError, rows: any) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve({
//               isFound: (rows as Array<any>).length === 1,
//               data: this.fillAthlete(rows)
//             });
//           }
//           this.end();
//         }
//       );
//     });
//   };

//   /**
//  * Βρίσκει τον αθλητή από το email του
//  * @param {string} AthleteEmail το email του αθλητή
//  * @return callback με 3 παραμέτρους
//  * @param err Αν υπάρχει λάθος σύνδεσης, αλλιώς null
//  * @param exists True αν υπάρχει, αλλιώς False
//  * @param {Array<Athlete>} Athlete αντικείμενο πίνακα αθλητών με ένα στοιχείο του αθλητή, αλλιώς null
//  */
//   findAthlitiByMail = (AthleteEmail: string, callback) => {
//     if (this._db === null) {
//       this.createDBConnection();
//     }
//     this._db.query(
//       `SELECT * FROM athletes where email='${AthleteEmail}'`,
//       (err: sql.IError, rows: any) => {
//         if (err) {
//           callback(err, null, null);
//         }
//         callback(
//           null,
//           (rows as Array<any>).length === 1,
//           this.fillAthlete(rows)
//         );
//         this.end();
//       }
//     );
//   };

// registerAthliti = (AthleteEmail: string, AthletePass: string, callback) => {
//   if (this._db === null) {
//     this.createDBConnection();
//   }

//   this.findAthlitiByMail(AthleteEmail, (err, isFound) => {
//     if (err) {
//       callback(err, null);
//     } else {
//       if (isFound) {
//         callback("Υπάρχει ήδη καταχωρημένος αθλητής με αυτό το email", null);
//       } else {
//         if (this._db === null) {
//           this.createDBConnection();
//         }
//         this._db.query(
//           this.signinQuery(AthleteEmail, AthletePass),
//           (err, rows) => {
//             if (err) {
//               callback(err, null);
//             } else {
//               let athlete = new Athlete();
//               athlete.id = rows.insertId;
//               athlete.email = AthleteEmail;
//               callback(null, athlete);
//             }
//           }
//         );
//       }
//     }
//   });
// };


// private signinQuery = (email: string, pass: string): string => {
//   let query = `INSERT INTO \`athletes\` (\`email\`, \`pass\`, \`fname\`, \`sname\`, \`weight\`, \`height\`, \`sex\`, \`bday\`, \`vo2max\`) VALUES
  
//   ( '${email}', '${crypt.hashSync(
//     pass
//   )}', 'Ανώνυμος','Ανεπίθετος', 88.1, 1.73, 'SEX_MALE', '1971-10-21' , '{"running": 20, "swimming": 20, "bicycling": 20}')`;
//   return query;
// };

  protected createDBConnection() {
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

