"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
const database_1 = require("../models/database");
const fs = require("fs");
const path = require("path");
const gp = require("tcxparse");
const enums_1 = require("./enums");
let vm = new classes_1.Vo2maxClass();
let ath = new classes_1.Athlete();
let hr = new classes_1.HeartRate(120, 130, 123);
let act = new classes_1.Activity();
let db = new database_1.default('training');
let data = fs.readFileSync(path.join(__dirname, 'test.tcx'), 'utf8');
gp.parseFile(path.join(__dirname, 'test.tcx'), (err, result) => {
    if (!err) {
        let activityObject = result.result.TrainingCenterDatabase.Activities[0].Activity[0];
        act.type = enums_1.activitiesTypes[activityObject.$.Sport];
        act.name = activityObject.Id[0];
        act.distance = 0;
        act.calories = 0;
        act.totalTime = 0;
        let avgHR = 0;
        let avgCadence = 0;
        let maxHR = 0;
        for (let i = 0; i < activityObject.Lap.length; i++) {
            let lap = new classes_1.Lap();
            lap.AverageHeartRateBpm = Number(activityObject.Lap[i].AverageHeartRateBpm[0].Value[0]);
            (activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed !== undefined) ? lap.AvgSpeed = Number(activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed)
                : lap.AvgSpeed = -1;
            lap.Cadence = activityObject.Lap[i].Cadence[0];
            lap.Calories = activityObject.Lap[i].Calories[0];
            lap.DistanceMeters = activityObject.Lap[i].DistanceMeters[0];
            lap.MaximumHeartRateBpm = activityObject.Lap[i].MaximumHeartRateBpm[0].Value[0];
            lap.MaximumSpeed = activityObject.Lap[i].MaximumSpeed[0];
            lap.StartTime = new Date(activityObject.Lap[i].$.StartTime);
            lap.TotalTimeSeconds = activityObject.Lap[i].TotalTimeSeconds[0];
            let track = new classes_1.Track();
            // console.log(`${lap.DistanceMeters} ${lap.MaximumSpeed.speedFromMpStoKpH()} pace ${lap.MaximumSpeed.decimalPaceFromSpeedMpS()}`)
            console.log(lap.TotalTimeSeconds);
            if (i === 0) {
                // console.log(JSON.stringify(activityObject.Lap[i].Track,null,2))
                act.start = lap.StartTime;
            }
            act.laps.push(lap);
            act.distance += lap.DistanceMeters;
            act.calories += lap.Calories;
            act.totalTime += lap.TotalTimeSeconds;
            avgHR += lap.AverageHeartRateBpm;
            avgCadence += lap.Cadence;
            ;
            (lap.MaximumHeartRateBpm > maxHR) ? maxHR = lap.MaximumHeartRateBpm : maxHR = maxHR;
            //      console.log(JSON.stringify(activityObject.Lap[i].Extensions[0].LX[0].AvgSpeed,null,2))  
            // console.log(JSON.stringify(activityObject.Lap[i].Extensions,null,2))  
        }
        avgHR = Math.floor(avgHR / act.laps.length);
        avgCadence = Math.floor(avgCadence / act.laps.length);
        //  console.log(act.laps[0].MaximumSpeed.decimalPaceFromSpeedMpS().decPaceToTimePace())
        // // console.log(act.distance.distanceFromMtoKM())
        console.log(JSON.stringify(act, null, 2));
        //  console.log(`avg HR ${avgHR} avg cadence ${avgCadence} maxHR ${maxHR} totalTime ${act.totalTime.secsToTime()}`)
    }
    else {
        console.log(err.message);
    }
});
let parseTcx = (tcx) => {
    let arr = tcx.split('\n');
    let slice;
    slice = findStr('Activity', tcx);
    tcx = tcx.slice(slice);
    //   console.log(tcx.slice(0,100))
    //   console.log(arr[arr.find(('<Activity')]);
};
let findStr = (sub, tcx) => {
    if (tcx.includes(sub)) {
        return tcx.search(`<${sub}`);
    }
    else {
        return -1;
    }
};
let bb = 6.2427;
console.log(bb.decPaceToTimePace());
//parseTcx(data);
let alfa = 11725.12;
console.log(alfa.secsToTime());
