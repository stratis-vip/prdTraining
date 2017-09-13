import { Athlete, Vo2maxClass, HeartRate, Altitude, Activity, Lap } from './classes';
import * as constants from './consts';
import DB from '../models/database'
import * as fs from 'fs'
import * as path from 'path'
import * as gp from 'tcxparse'
import {activitiesTypes, activitiesSubTypes} from './enums'

interface iActivity{
    $:{
        Sport:string
    }
    Id:Array<string>
    Lap:Array<{
        $:{
            StartTime:string
        }
        TotalTimeSeconds:Array<string>
        DistanceMeters: Array<string>
        MaximumSpeed: Array<string>
        Calories: Array<string>
        AverageHeartRateBpm: {}
        MaximumHeartRateBpm: {}
        Cadence: Array<string>
        Track: Array<{}>
        Extensions: Array<{}>
    }>
}

let vm = new Vo2maxClass();
let ath = new Athlete();
let hr = new HeartRate(120,130,123);
let act = new Activity();
let db = new DB('training');

let data = fs.readFileSync(path.join(__dirname,'test.tcx'),'utf8');
gp.parseFile(path.join(__dirname,'test.tcx'),(err,result)=>{
    if (!err){
        let activityObject:iActivity=result.result.TrainingCenterDatabase.Activities[0].Activity[0];

        act.type=activitiesTypes[(activityObject.$.Sport as string)];
        act.name = activityObject.Id[0];
        for (let i =0; i < activityObject.Lap.length;i++){
            let lap = new Lap();
            lap.StartTime=new Date(activityObject.Lap[i].$.StartTime)
            lap.AverageHeartRateBpm = activityObject.Lap[i].AverageHeartRateBpm[0].Value[0] 
            console.log(activityObject.Lap[i].AverageHeartRateBpm[0].Value[0]);
            console.log(lap.StartTime);
            if (i===0) { act.start=lap.StartTime}
            act.laps.push(lap)
        }
       
        console.log(act.laps)
    } else 
    {console.log(err.message)}
})
let parseTcx = (tcx:string) => {
    
    let arr = tcx.split('\n');
    let slice:number;
    slice = findStr('Activity',tcx);
    tcx= tcx.slice(slice)
 //   console.log(tcx.slice(0,100))


 //   console.log(arr[arr.find(('<Activity')]);

}

let findStr = (sub:string, tcx:string):number => {
    if (tcx.includes(sub)){
        return tcx.search(`<${sub}`);
        
    }else {return -1}
    
}

//parseTcx(data);