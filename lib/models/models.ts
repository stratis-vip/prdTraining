import * as sql from 'sqlite3';

let db = new sql.Database('training');

//check if there is a table name athletes

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
)