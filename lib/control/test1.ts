import {
  Athlete,
  Vo2maxClass,
  HeartRate,
  Altitude,
  Activity,
  Lap,
  Track,
  TrackPointClass,
  dummy
} from "./classes";
import * as constants from "./consts";
import DB from "../models/database";
import * as fs from "fs";
import * as path from "path";
import * as gp from "tcxparse";
import { activitiesTypes, activitiesSubTypes } from "./enums";
import {
  getActivities,
  getAuthor,
  getLaps,
  getResult,
  iActivity,
  iResult,
  iLap
} from "./classes/src/interfaces";
import { secsToTime, speedFromMpStoKpH, distanceFromMtoKM } from "./functions";
/*
interface iPointHR{
    $:{
        'xsi:type': string  
    }
    value: number
}

interface iPoint{
	LatitudeDegrees: Array<number>
	LongitudeDegrees: Array<number>
	AltitudeMeters: Array<number>
}
interface parentTrack{
    TrackPoint:Array<{}>
}
interface iTrackPoint{
    Time: Array<string>
	Position: Array<iPoint>
	DistanceMeters: Array<number>
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
		TotalTimeSeconds: Array<number>
        DistanceMeters: Array<number>
        MaximumSpeed: Array<number>
        Calories: Array<number>
        AverageHeartRateBpm: {}
        MaximumHeartRateBpm: {}
        Cadence: Array<number>
        Track: Array<parentTrack>
        Extensions: Array<iLXExtension>
    }>
}*/

let vm = new Vo2maxClass();
let ath = new Athlete();
let hr = new HeartRate(120, 130, 123);
let act = new Activity();
let db = new DB("training");
let d = new dummy();
let data = fs.readFileSync(path.join(__dirname, "test.tcx"), "utf8");
gp.parseFile(path.join(__dirname, "test.tcx"), (err, tcxData) => {
  if (!err) {
    // console.log(typeof(tcxData))
    let resultObject: iResult = getResult(tcxData);
    let activitiesObject = getActivities(resultObject); //.result//.TrainingCenterDatabase.Activities[0].Activity[0];
    let author = getAuthor(resultObject);
    //console.log(JSON.stringify(activitiesObject[0].Activity[0].Id[0],null,2))
    act.name = activitiesObject[0].Activity[0].Id[0];
    act.type = activitiesTypes[activitiesObject[0].Activity[0].$.Sport];

    let laps = getLaps(activitiesObject[0]);
   
    act.totalTime = 0;
    act.distance = 0;
    act.calories = 0;
    let count = 1;
    let maxHR = 0;
    let avgHR = 0;
    let maxSpeed = 0;
    let avgCadence=0;
    console.log(
`SUMMARY\nLaps: ${laps.length}
Name: ${act.name}
Type: ${activitiesTypes[act.type]}    
LAPS`);
    laps.forEach((tcxLap: iLap) => {
      let lap = new Lap();
      lap.StartTime = new Date(tcxLap.$.StartTime);
      if (count === 1) {act.start=lap.StartTime}
      lap.TotalTimeSeconds = Number(tcxLap.TotalTimeSeconds[0]);
      lap.DistanceMeters = Number(tcxLap.DistanceMeters[0]);
      act.distance += Number(lap.DistanceMeters);
      act.totalTime += Number(lap.TotalTimeSeconds);
      lap.Calories = Number(tcxLap.Calories[0])
      lap.AvgSpeed =Number( tcxLap.Extensions[0].LX[0].AvgSpeed[0])
      lap.Cadence = Number(tcxLap.Cadence[0])
      //if (avgCadence < lap.Cadence){avgCadence=lap.Cadence}
      avgCadence +=Number(lap.Cadence)
      act.calories += Number(lap.Calories);
      
      lap.AverageHeartRateBpm = Number(tcxLap.AverageHeartRateBpm[0].Value[0]);
      avgHR += Number(lap.AverageHeartRateBpm)
      lap.MaximumHeartRateBpm = Number(tcxLap.MaximumHeartRateBpm[0].Value[0]);
      if (maxHR < lap.MaximumHeartRateBpm){maxHR= lap.MaximumHeartRateBpm}
      lap.MaximumSpeed =Number(tcxLap.MaximumSpeed[0])
    
      if (lap.MaximumSpeed > maxSpeed) {maxSpeed = lap.MaximumSpeed}
      console.log(lap.MaximumSpeed+'  max='+ maxSpeed)
      console.log(
`  ${count++} from ${laps.length}
    Starting at ${lap.StartTime}
    Distance in KM:${(lap.DistanceMeters / 1000).toFixed(2)}
    TotalTime:${secsToTime(lap.TotalTimeSeconds)}
    AverageHeartRateBpm:${lap.AverageHeartRateBpm}
    MaximumHeartRateBpm:${lap.MaximumHeartRateBpm}
    AvgSpeed:${speedFromMpStoKpH(lap.AvgSpeed).toFixed(2)}
    MaxSpeed:${(speedFromMpStoKpH(lap.MaximumSpeed)).toFixed(2)}
    `)


    });

    avgHR /= laps.length
    avgCadence /= laps.length
    console.log(
`Start Time: ${act.start}
TOTALS\n\tTime in seconds: ${secsToTime(act.totalTime)}
\tDistance in KM:  ${distanceFromMtoKM(act.distance).toFixed(2)}
\tCalories:  ${act.calories}
\tAverage HR: ${Math.floor(avgHR)}
\tMaximum HR: ${Math.floor(maxHR)}
\tAvg Cadence : ${Math.floor(avgCadence)}
\tMaximum Speed: ${speedFromMpStoKpH(maxSpeed).toFixed(2)}
`);




    //console.log(JSON.stringify(author[0].Name[0],null,2))
    /*        
        act.name = activityObject.Id[0];
        act.distance=0;
        act.calories=0;
        
        let avgHR = 0;
        let avgCadence = 0;
        let maxHR=0;
        for (let i =0; i < activityObject.Lap.length;i++){
            let lap = new Lap();
            lap.AverageHeartRateBpm = Number(activityObject.Lap[i].AverageHeartRateBpm[0].Value[0])
            ;(activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed !== undefined) ? lap.AvgSpeed =Number(activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed)
                : lap.AvgSpeed = -1;
            lap.Cadence = activityObject.Lap[i].Cadence[0]
            lap.Calories = activityObject.Lap[i].Calories[0]
            lap.DistanceMeters = activityObject.Lap[i].DistanceMeters[0] 
            lap.MaximumHeartRateBpm = activityObject.Lap[i].MaximumHeartRateBpm[0].Value[0]
            lap.MaximumSpeed = activityObject.Lap[i].MaximumSpeed[0]
            lap.StartTime=new Date(activityObject.Lap[i].$.StartTime)
            lap.TotalTimeSeconds = activityObject.Lap[i].TotalTimeSeconds[0]          
            let o = activityObject.Lap[i].Track[0];
        //    console.log((o))
          //  for (let j = 0; activityObject.Lap[i].Track; j++){
        //        let track = new Track()
              //  track.Position.Time =new Date(activityObject.Lap[i].Track[j].Time[0])
                // track.Position.LongitudeDegrees = activityObject.Lap[i].Track[j].Position[0].LongitudeDegrees[0]
                // track.Position.LatitudeDegrees = activityObject.Lap[i].Track[j].Position[0].LatitudeDegrees[0]
                // track.Position.AltitudeMeters = activityObject.Lap[i].Track[j].Position[0].AltitudeMeters[0]
                // console.log(track)
           // }
            
            // console.log(`${lap.DistanceMeters} ${lap.MaximumSpeed.speedFromMpStoKpH()} pace ${lap.MaximumSpeed.decimalPaceFromSpeedMpS()}`)

			//console.log(lap.TotalTimeSeconds)
           
            if (i===0) { 
               // console.log(JSON.stringify(activityObject.Lap[i].Track,null,2))
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
       //   console.log(JSON.stringify(act, null, 2))
        //  console.log(`avg HR ${avgHR} avg cadence ${avgCadence} maxHR ${maxHR} totalTime ${act.totalTime.secsToTime()}`)
    */
  } else {
    console.log(err.message);
  }
});
let parseTcx = (tcx: string) => {
  let arr = tcx.split("\n");
  let slice: number;
  slice = findStr("Activity", tcx);
  tcx = tcx.slice(slice);
  //   console.log(tcx.slice(0,100))

  //   console.log(arr[arr.find(('<Activity')]);
};

let findStr = (sub: string, tcx: string): number => {
  if (tcx.includes(sub)) {
    return tcx.search(`<${sub}`);
  } else {
    return -1;
  }
};
let bb = 6.2427;
//console.log(bb.decPaceToTimePace())
//parseTcx(data);
