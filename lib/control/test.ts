import {Athlete, Vo2maxClass, HeartRate, Altitude } from './classes';
import * as constants from './consts';


let vm = new Vo2maxClass();
let ath = new Athlete();
let hr = new HeartRate(120,130,123);

import DB from '../models/database'

let db = new DB('training');

db.getAthites((err,rows)=>{
    if (err){
        return console.log(err)
    }
    console.log(rows);
})
db.Emiter.on('error',(value)=>{
    console.log(`onError = ${JSON.stringify(value,null,2)}`);
});
db.Emiter.on('finish',(value)=>{
    console.log(`onFinish = ${JSON.stringify(value,null,2)}`);
});


