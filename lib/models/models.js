"use strict";
exports.__esModule = true;
var sql = require("sqlite3");
var interfaces_1 = require("./interfaces");
sql.verbose();
var errors = [];
var steps = [];
//check if there is a table name athletes
//let checkIfTableExists = 
var checkIfTableExists = function (tableName) {
    return new Promise(function (resolve, reject) {
        var query = "SELECT name FROM sqlite_master WHERE type='table' AND name='" + tableName + "'";
        db.get(query, function (err, row) {
            if (err) {
                reject(new interfaces_1.answer(err.message, interfaces_1.actions.STOP_PROGRAM_ERROR));
            } // κάποιο λάθος παρουσιάστηκε
            else {
                if (row === undefined) {
                    reject(new interfaces_1.answer("Table " + tableName + " not exists", interfaces_1.actions.ACTION_REQUIRED));
                } // ο πίνακας δεν υπάρχει
                else {
                    if (row.name === tableName) {
                        resolve(new interfaces_1.answer("Table Exists", interfaces_1.actions.NO_ACTION));
                    }
                    else {
                        reject(new interfaces_1.answer("Table " + tableName + " not exists", interfaces_1.actions.ACTION_REQUIRED));
                    }
                }
            }
        });
    });
};
var createTableAthletes = function () {
    return new Promise(function () {
        db.get("CREATE TABLE 'athletes' (\n            'id'\tINTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,\n            'name'\tTEXT NOT NULL DEFAULT '\u0391\u03BD\u03CE\u03BD\u03C5\u03BC\u03BF\u03C2  \u0391\u03B8\u03BB\u03B7\u03C4\u03AE\u03C2',\n            'weight'\tREAL NOT NULL DEFAULT 75.0,\n            'height'\tREAL NOT NULL DEFAULT 1.73,\n            'sex'\tINTEGER NOT NULL DEFAULT 0,\n            'bday'\tTEXT NOT NULL,\n            'vo2max'\tTEXT NOT NULL", function (err, row) {
            //check for error and reject
            //resolve if everything all right
        });
    });
};
var db = new sql.Database('training', sql.OPEN_READWRITE | sql.OPEN_CREATE);
db.on('profile', function (sql, time) { return console.log("TRACE||||||| " + sql + " at " + time); });
//db.configure('profile',logger);
function logger() {
}
checkIfTableExists('athletes')
    .then(function (value) {
    steps.push(value);
    console.log("STEPS\n" + JSON.stringify(steps, null, 2));
})["catch"](function (value) {
    errors.push(value);
    switch (value.action) {
        case interfaces_1.actions.ACTION_REQUIRED:
            console.log("TODO -> create Table Athletes");
            //create table athletes
            break;
        case interfaces_1.actions.STOP_PROGRAM_ERROR:
            console.log("TODO -> create Program error Message");
            //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα
            break;
        case interfaces_1.actions.NO_ACTION:
    }
    console.log("ERRORS\n" + JSON.stringify(errors, null, 2));
});
