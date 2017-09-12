import * as dot from 'dotenv';
import * as sql from 'sqlite3';
import { actions, answer } from './interfaces';

sql.verbose();
let errors: Array<answer> = [];
let steps: Array<answer> = [];


//check if there is a table name athletes
//let checkIfTableExists = 


let checkIfTableExists = (tableName: string): Promise<answer> => {
    return new Promise((resolve, reject) => {
        let query: string = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
        db.get(query, (err: Error | null, row: any) => {
            if (err) { reject(new answer(err.message, actions.STOP_PROGRAM_ERROR )); } // κάποιο λάθος παρουσιάστηκε
            else {
                if (row === undefined) {
                    reject(new answer(`Table ${tableName} not exists`, actions.ACTION_REQUIRED ));
                } // ο πίνακας δεν υπάρχει
                else {
                    if (row.name === tableName) {
                        resolve(new answer("Table Exists", actions.NO_ACTION));
                    }
                    else { reject(new answer(`Table ${tableName} not exists`, actions.ACTION_REQUIRED )) }
                }
            }
        });
    });
}

let createTableAthletes = ():Promise<answer> =>{
    return new Promise(()=>{
        db.get(`CREATE TABLE 'athletes' (
                'id'	    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                'name'	    TEXT NOT NULL DEFAULT 'Ανώνυμος  Αθλητής',
                'weight'	REAL NOT NULL DEFAULT 75.0,
                'height'	REAL NOT NULL DEFAULT 1.73,
                'sex'	    INTEGER NOT NULL DEFAULT 0,
                'bday'  	TEXT NOT NULL,
                'vo2max'	TEXT NOT NULL`,(err:Error | null, row:any) =>{
                //check for error and reject
                //resolve if everything all right
            }
        );
    })
}

let db = new sql.Database('training', sql.OPEN_READWRITE | sql.OPEN_CREATE);

checkIfTableExists('athletes')
    .then((value) => {
        steps.push(value);
        console.log(`STEPS\n${JSON.stringify(steps,null,2)}`);
    })
    .catch((value) => {
        errors.push(value);
        switch (value.action) {
            case actions.ACTION_REQUIRED:
                console.log(`TODO -> create Table Athletes`)
                //create table athletes
                break;
            case actions.STOP_PROGRAM_ERROR:
                console.log(`TODO -> create Program error Message`)
                //ενημέρωσε πως έχουμε πρόβλημα στη βάση και πρέπει να σταματήσει το πρόγραμμα

                break;
            case actions.NO_ACTION:
        }
        console.log(`ERRORS\n${JSON.stringify(errors,null,2)}`);
    });