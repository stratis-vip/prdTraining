import { Athlete, Vo2maxClass, HeartRate, Altitude, Activity, Lap } from './classes';
import * as constants from './consts';
import DB from '../models/database'
import * as fs from 'fs'
import * as path from 'path'
import * as gp from 'tcxparse'
import {activitiesTypes, activitiesSubTypes} from './enums'

interface iPointHR{
    $:{
        'xsi:type': string  
    }
    value: number
}

interface iPoint{
    LatitudeDegrees: Array<string>
    LongitudeDegrees: Array<string>
}

interface iTrackPoint{
    Time: Array<string>
    Position: Array<{iPoint}>
    AltitudeMeters: Array<string>
    DistanceMeters: Array<string>
    HeartRateBpm: Array<iPointHR>
    Cadence: Array<number>
    Speed: Array<iTPXExtension>
}
interface iTPXExtension{
    $:{
        xmlns:string 
    }
    Speed:number
}
interface iLXExtension{
    LX:Array<iLXExtension>
}

interface iLXExtension{
    $:{
        xmlns:string
    },
    AvgSpeed:number  
}

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
        Extensions: Array<iLXExtension>
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
        act.distance=0;
        act.calories=0;
        act.totalTime=0;
        let avgHR = 0;
        let avgCadence = 0;
        let maxHR=0;
        for (let i =0; i < activityObject.Lap.length;i++){
            let lap = new Lap();

            lap.AverageHeartRateBpm = Number(activityObject.Lap[i].AverageHeartRateBpm[0].Value[0])
            ;(activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed !== undefined) ? lap.AvgSpeed =Number(activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed)
                : lap.AvgSpeed = -1;
            lap.Cadence = Number(activityObject.Lap[i].Cadence[0])
            lap.Calories = Number(activityObject.Lap[i].Calories[0]);
            lap.DistanceMeters = Number(activityObject.Lap[i].DistanceMeters[0]) 
            lap.MaximumHeartRateBpm = Number(activityObject.Lap[i].MaximumHeartRateBpm[0].Value[0])
            lap.MaximumSpeed = Number(activityObject.Lap[i].MaximumSpeed[0]);
            lap.StartTime=new Date(activityObject.Lap[i].$.StartTime)
            lap.TotalTimeSeconds = Number(activityObject.Lap[i].TotalTimeSeconds)           
            
            // console.log(`${lap.DistanceMeters} ${lap.MaximumSpeed.speedFromMpStoKpH()} pace ${lap.MaximumSpeed.decimalPaceFromSpeedMpS()}`)
            
            
           
            if (i===0) { 
                console.log(JSON.stringify(activityObject.Lap[i].Track,null,2))
                act.start=lap.StartTime}
            act.laps.push(lap)
            act.distance += lap.DistanceMeters;
            act.calories += lap.Calories;
            act.totalTime += lap.TotalTimeSeconds;
            avgHR += lap.AverageHeartRateBpm; 
            avgCadence += lap.Cadence;  
            ;(lap.MaximumHeartRateBpm > maxHR) ? maxHR = lap.MaximumHeartRateBpm : maxHR = maxHR 

      //      console.log(JSON.stringify(activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed,null,2))  
           // console.log(JSON.stringify(activityObject.Lap[i].Extensions,null,2))  
        }
        avgHR = Math.floor(avgHR / act.laps.length);
        avgCadence = Math.floor(avgCadence / act.laps.length);
        //  console.log(act.laps[0].MaximumSpeed.decimalPaceFromSpeedMpS().decPaceToTimePace())
        // // console.log(act.distance.distanceFromMtoKM())
        //  console.log(JSON.stringify(act, null, 2))
        //  console.log(`avg HR ${avgHR} avg cadence ${avgCadence} maxHR ${maxHR} totalTime ${act.totalTime.secsToTime()}`)
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