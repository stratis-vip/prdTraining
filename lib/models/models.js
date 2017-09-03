"use strict";
exports.__esModule = true;
var sql = require("sqlite3");
var db = new sql.Database('training');
//check if there is a table name athletes
db.get('SELECT * FROM ATHLETES', function (err, row) {
    if (err) {
        return console.log(err);
    }
    else {
        if (row) {
            console.log(row);
        }
        else {
            console.log('no row');
        }
    }
});
