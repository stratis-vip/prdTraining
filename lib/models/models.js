"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql = require("sqlite3");
const interfaces_1 = require("./interfaces");
let errors = [];
let steps = [];
//check if there is a table name athletes
//let checkIfTableExists = 
let checkIfTableExists = (tableName) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
        db.get(query, (err, row) => {
            if (err) {
                reject({ reason: err.message, action: interfaces_1.actions.STOP_PROGRAM_ERROR });
            } // κάποιο λάθος παρουσιάστηκε
            else {
                if (row === undefined) {
                    reject({ reason: "Table not exists", action: interfaces_1.actions.ACTION_REQUIRED });
                } // ο πίνακας δεν υπάρχει
                else {
                    if (row.name === tableName) {
                        resolve({ reason: "Table Exists", action: interfaces_1.actions.NO_ACTION });
                    }
                    else {
                        reject({ reason: "Table not exists", action: interfaces_1.actions.ACTION_REQUIRED });
                    }
                }
            }
        });
    });
};
let db = new sql.Database('training', sql.OPEN_READWRITE | sql.OPEN_CREATE, (err) => {
    if (err) {
        return errors.push({ reason: err.message, action: interfaces_1.actions.STOP_PROGRAM_ERROR });
    }
    else {
        steps.push({ reason: "Βάση Δεδομένων ΟΚ", action: interfaces_1.actions.NO_ACTION });
        return console.log(steps);
    }
});
checkIfTableExists('athletes')
    .then((value) => {
    console.log(`table athletes exists ${JSON.stringify(value)}`);
})
    .catch((value) => {
    console.log(`table athletes does not exists ${JSON.stringify(value)}`);
    switch (value.action) {
        case interfaces_1.actions.ACTION_REQUIRED:
            console.log(`TODO -> create Table Athletes`);
            //create table athletes
            break;
        case interfaces_1.actions.STOP_PROGRAM_ERROR:
            console.log(`TODO -> create Program error Message`);
            //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα
            break;
        case interfaces_1.actions.NO_ACTION:
    }
});
console.log(errors);
/*
db.get('SELECT * FROM ATHLETES',(err:Error | null, row:any,)=>
{
    if (err){
        return console.log(err);
    }else{
        if (row){
        console.log(row);}
        else
            {
                console.log('no row');
            }
    }
}
)*/ 
