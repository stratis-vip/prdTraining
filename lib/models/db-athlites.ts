import * as sql from "mysql";
import DB from "./database";
import Athlete from "../control/classes/src/athlete";
import * as crypt from 'bcryptjs';

export default class DBAthlete extends DB {
  constructor() {
    super();
  }

  getAthites = callback => {
    if (!this._db) {
      this.createDBConnection();
    }
    this._db.query(`SELECT * FROM athletes`, (err: sql.IError, rows: any) => {
      if (err) {
        return callback(err, null);
      } else {
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

  private fillAthlete = (rows: Array<any>): Array<{}> => {
    let arr = new Array<{}>();
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
      arr.push(a.object);
    });
    console.log(`DATABASE SEND \n${JSON.stringify(arr, null, 2)}`);
    return arr;
  };

  updateAthlitiById = (AthleteId: number, ath: Athlete) => {
    return new Promise((resolve, reject) => {
      if (this._db === null) {
        this.createDBConnection();
      }
      let da = new Date(ath.bday);
      let bday = da.toISOString().substr(0, 10);
      let que = `UPDATE athletes  SET email='${ath.email}', fname='${ath.fname}', sname='${ath.sname}', weight=${ath.weight}, 
        height= ${ath.height}, sex='${ath.sex}', bday='${bday}', vo2max='${JSON.stringify(
        ath.vo2max
      )}'  where id=${AthleteId}`;
      console.log(que);
      this._db.query(que, (err: sql.IError, rows: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows.changedRows);
        }
        this.end();
      });
    });
  };

  deleteAthlitiById = (AthleteId: number) => {
    return new Promise((resolve, reject) => {
      if (this._db === null) {
        this.createDBConnection();
      }
      this._db.query(
        `DELETE FROM athletes where id=${AthleteId}`,
        (err: sql.IError, results: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.affectedRows);
          }
        }
      );
    });
  };

  findAthlitiById = (athleteId: number) => {
    return new Promise((resolve, reject) => {
      if (this._db === null) {
        this.createDBConnection();
      }
      this._db.query(
        `SELECT * FROM athletes where id=${athleteId}`,
        (err: sql.IError, rows: any) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              isFound: (rows as Array<any>).length === 1,
              data: this.fillAthlete(rows)
            });
          }
          this.end();
        }
      );
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
  findAthlitiByMail = (AthleteEmail: string, callback) => {
    if (this._db === null) {
      this.createDBConnection();
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

  registerAthliti = (AthleteEmail: string, AthletePass: string, callback) => {
    if (this._db === null) {
      this.createDBConnection();
    }

    this.findAthlitiByMail(AthleteEmail, (err, isFound) => {
      if (err) {
        callback(err, null);
      } else {
        if (isFound) {
          callback("Υπάρχει ήδη καταχωρημένος αθλητής με αυτό το email", null);
        } else {
          if (this._db === null) {
            this.createDBConnection();
          }
          this._db.query(
            this.signinQuery(AthleteEmail, AthletePass),
            (err, rows) => {
              if (err) {
                callback(err, null);
              } else {
                let athlete = new Athlete();
                athlete.id = rows.insertId;
                athlete.email = AthleteEmail;
                callback(null, athlete);
              }
            }
          );
        }
      }
    });
  };

  private signinQuery = (email: string, pass: string): string => {
    let query = `INSERT INTO \`athletes\` (\`email\`, \`pass\`, \`fname\`, \`sname\`, \`weight\`, \`height\`, \`sex\`, \`bday\`, \`vo2max\`) VALUES
    
    ( '${email}', '${crypt.hashSync(
      pass
    )}', 'Ανώνυμος','Ανεπίθετος', 88.1, 1.73, 'SEX_MALE', '1971-10-21' , '{"running": 20, "swimming": 20, "bicycling": 20}')`;
    return query;
  };

}
