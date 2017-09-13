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
        for (let i = 0; i < activityObject.Lap.length; i++) {
            let lap = new classes_1.Lap();
            lap.StartTime = new Date(activityObject.Lap[i].$.StartTime);
            lap.AverageHeartRateBpm = activityObject.Lap[i].AverageHeartRateBpm[0].Value[0];
            console.log(activityObject.Lap[i].AverageHeartRateBpm[0].Value[0]);
            console.log(lap.StartTime);
            if (i === 0) {
                act.start = lap.StartTime;
            }
            act.laps.push(lap);
        }
        console.log(act.laps);
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
//parseTcx(data); 
