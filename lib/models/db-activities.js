"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const activity_1 = require("../control/classes/src/activity");
class DBActivity extends database_1.default {
    constructor() {
        super();
        this.getActivities = callback => {
            if (!this._db) {
                this.createDBConnection();
            }
            this._db.query(`SELECT * FROM activities`, (err, rows) => {
                if (err) {
                    return callback(err, null);
                }
                else {
                    if (!rows) {
                        return callback(null);
                    }
                    console.log(`before fill`);
                    let arr = this.fillActivity(rows);
                    this.end();
                    return callback(null, arr);
                }
            });
        };
        this.fillActivity = (rows) => {
            let arr = new Array();
            rows.forEach(row => {
                let a = new activity_1.default();
                a.id = row.id;
                a.name = row.name;
                a.type = row.type;
                a.totalTime = row.totalTime;
                a.distance = row.distance;
                a.athleteId = row.athleteId;
                console.log(`${JSON.stringify(a, null, 2)}`);
                arr.push(a.object);
            });
            return arr;
        };
        this.updateActivityById = (ActivityId, activity) => {
            return new Promise((resolve, reject) => {
                // if (this._db === null) {
                //   this.createDBConnection();
                // }
                // let da = new Date(activity.bday);
                // let bday = da.toISOString().substr(0, 10);
                // let que = `UPDATE activities SET email='${activity.email}', fname='${activity.fname}', sname='${activity.sname}', weight=${activity.weight}, 
                //   height= ${activity.height}, sex='${activity.sex}', bday='${bday}', vo2max='${JSON.stringify(
                //   activity.vo2max
                // )}'  where id=${ActivityId}`;
                // console.log(que);
                // this._db.query(que, (err: sql.IError, rows: any) => {
                //   if (err) {
                //     reject(err);
                //   } else {
                //     resolve(rows.changedRows);
                //   }
                //   this.end();
                // });
            });
        };
        this.deleteActivityById = (ActivityId) => {
            return new Promise((resolve, reject) => {
                if (this._db === null) {
                    this.createDBConnection();
                }
                this._db.query(`DELETE FROM activities where id=${ActivityId}`, (err, results) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(results.affectedRows);
                    }
                });
            });
        };
        this.findActivityById = (activityId) => {
            return new Promise((resolve, reject) => {
                if (this._db === null) {
                    this.createDBConnection();
                }
                this._db.query(`SELECT * FROM activities where id=${activityId}`, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({
                            isFound: rows.length === 1,
                            data: this.fillActivity(rows)
                        });
                    }
                    this.end();
                });
            });
        };
        this.addActivityQuery = (activ) => {
            let query = `INSERT INTO \`activities\` (\`email\`, \`pass\`, \`fname\`, \`sname\`, \`weight\`, \`height\`, \`sex\`, \`bday\`, \`vo2max\`) VALUES
    
    ( '', '', 'Ανώνυμος','Ανεπίθετος', 88.1, 1.73, 'SEX_MALE', '1971-10-21' , '{"running": 20, "swimming": 20, "bicycling": 20}')`;
            return query;
        };
        this.findActivityByName = (activityName) => {
            return new Promise((resolve, reject) => {
                if (this._db === null) {
                    this.createDBConnection();
                }
                this._db.query(`SELECT * FROM activities where name=${activityName}`, (err, rows) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve({
                            isFound: rows.length === 1,
                            data: this.fillActivity(rows)
                        });
                    }
                    this.end();
                });
            });
        };
        this.addActivity = (act, callback) => {
            if (this._db === null) {
                this.createDBConnection();
            }
            this.findActivityByName(act.name)
                .then(value => {
                if (value.isFound) {
                    callback("Υπάρχει ήδη καταχωρημένος αθλητής με αυτό το email", null);
                }
                else {
                    if (this._db === null) {
                        this.createDBConnection();
                    }
                    this._db.query(this.addActivityQuery(act), (err, rows) => {
                        if (err) {
                            callback(err, null);
                        }
                        else {
                            let activity = new activity_1.default();
                            activity.id = rows.insertId;
                            callback(null, activity);
                        }
                    });
                }
            })
                .catch(reason => { });
        };
    }
}
exports.default = DBActivity;
