"use strict";
exports.__esModule = true;
var sql = require("sqlite3");
var interfaces_1 = require("./interfaces");
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
var db = new sql.Database('training', sql.OPEN_READWRITE | sql.OPEN_CREATE);
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
    console.log("ERROS\n" + JSON.stringify(errors, null, 2));
});
