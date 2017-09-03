import * as dot from 'dotenv';
import * as sql from 'sqlite3';
import { actions, answer } from './interfaces';

let errors: Array<answer> = [];
let steps: Array<answer> = [];



//check if there is a table name athletes
//let checkIfTableExists = 


let checkIfTableExists = (tableName: string): Promise<answer> => {
    return new Promise((resolve, reject) => {
        let query: string = `SELECT name FROM sqlite_master WHERE type='table' AND name='${tableName}'`;
        db.get(query, (err: Error | null, row: any) => {
            if (err) { reject({ reason: err.message, action: actions.STOP_PROGRAM_ERROR }); } // κάποιο λάθος παρουσιάστηκε
            else {
                if (row === undefined) {
                    reject({ reason: "Table not exists", action: actions.ACTION_REQUIRED });
                } // ο πίνακας δεν υπάρχει
                else {
                    if (row.name === tableName) {
                        resolve({ reason: "Table Exists", action: actions.NO_ACTION });
                    }
                    else { reject({ reason: "Table not exists", action: actions.ACTION_REQUIRED }) }
                }
            }
        });
    });
}


let db = new sql.Database('training', sql.OPEN_READWRITE | sql.OPEN_CREATE);

checkIfTableExists('athletes')
    .then((value) => {
        steps.push(value);
    })
    .catch((value) => {
        console.log(`table athletes does not exists ${JSON.stringify(value)}`);
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
    });

    
   

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