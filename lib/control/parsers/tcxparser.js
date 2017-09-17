"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../classes/index");
const gp = require("tcxparse");
const tcxinterfaces_1 = require("./tcxinterfaces");
/**
 * Ανοίγει ένα αρχείο TCX (filename) και φορτώνει τα δεδομένα που με απασχολούν σε
 * αντικείμενο Activity
 * @param {string} filename η πλήρης διαδρομή στο αρχείο ΤCX
 * @returns ένα αντικείμενο Activity ή null (σε περίπτωση λάθους)
 */
exports.getActivityFromFile = (filename, CallBack) => {
    let act = new index_1.Activity();
    // fs.readFile(filename, "utf8", (err, data) => {
    //   if (err) {
    //     console.log(err.message);
    //   } else {
    gp.parseFile(filename, (err, tcxData) => {
        if (!err) {
            let resultObject = tcxinterfaces_1.getResult(tcxData);
            let author = tcxinterfaces_1.getAuthor(resultObject);
            let activitiesObject = tcxinterfaces_1.getActivities(resultObject);
            let laps = tcxinterfaces_1.getLaps(activitiesObject[0]);
            act = new index_1.Activity();
            act.name = activitiesObject[0].Activity[0].Id[0];
            act.type = index_1.activitiesTypes[activitiesObject[0].Activity[0].$.Sport];
            act.totalTime = 0;
            act.distance = 0;
            act.calories = 0;
            let count = 1;
            let maxHR = 0;
            let avgHR = 0;
            let maxSpeed = 0;
            let avgCadence = 0;
            laps.forEach((tcxLap) => {
                let lap = tcxinterfaces_1.fillLap(tcxLap);
                if (count === 1) {
                    act.start = lap.StartTime;
                }
                avgCadence += Number(lap.Cadence);
                act.calories += Number(lap.Calories);
                act.distance += Number(lap.DistanceMeters);
                act.totalTime += Number(lap.TotalTimeSeconds);
                avgHR += Number(lap.AverageHeartRateBpm);
                if (maxHR < lap.MaximumHeartRateBpm) {
                    maxHR = lap.MaximumHeartRateBpm;
                }
                if (lap.MaximumSpeed > maxSpeed) {
                    maxSpeed = lap.MaximumSpeed;
                }
                let points = tcxinterfaces_1.getTrack(tcxLap);
                points.forEach((point) => {
                    lap.Track.push(tcxinterfaces_1.fillPoint(point));
                }); //<-forEach point
                act.laps.push(lap);
            });
            avgHR /= laps.length;
            avgCadence /= laps.length;
            CallBack(null, act);
        }
        else {
            CallBack(err.message, act);
        }
    });
    //    }
};
