"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const index_1 = require("./classes/index");
const gp = require("tcxparse");
const interfaces_1 = require("./classes/src/interfaces");
/**
 * Ανοίγει ένα αρχείο TCX (filename) και φορτώνει τα δεδομένα που με απασχολούν σε
 * αντικείμενο Activity
 * @param {string} filename η πλήρης διαδρομή στο αρχείο ΤCX
 * @returns ένα αντικείμενο Activity ή null (σε περίπτωση λάθους)
 */
exports.getActivityFromFile = (filename) => {
    let act = null;
    new index_1.Activity();
    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            console.log(err.message);
        }
        else {
            gp.parseFile(path.join(__dirname, "test.tcx"), (err, tcxData) => {
                if (!err) {
                    let resultObject = interfaces_1.getResult(tcxData);
                    let author = interfaces_1.getAuthor(resultObject);
                    let activitiesObject = interfaces_1.getActivities(resultObject);
                    let laps = interfaces_1.getLaps(activitiesObject[0]);
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
                        let lap = interfaces_1.fillLap(tcxLap);
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
                        let points = interfaces_1.getTrack(tcxLap);
                        points.forEach((point) => {
                            lap.Track.push(interfaces_1.fillPoint(point));
                        }); //<-forEach point
                        act.laps.push(lap);
                    });
                    avgHR /= laps.length;
                    avgCadence /= laps.length;
                }
                else {
                    console.log(err.message);
                }
            });
        }
    });
    return act;
};
