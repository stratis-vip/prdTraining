"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const geoPoint_1 = require("./classes/src/geoPoint");
const getPointsPer100m = (activity) => {
    return new Promise((resolve, reject) => {
        if (activity === undefined) {
            reject(`Η δραστηριότητα είναι άκυρη`);
        }
        let al = new Array();
        let multiplier = 1;
        activity.laps.forEach(lap => {
            lap.Track.forEach(tr => {
                if (tr.DistanceMeters - (100 * multiplier) > 0) {
                    let _time = (tr.Position.Time.getTime() - activity.start.getTime()) / 1000;
                    let _distance100 = tr.DistanceMeters - 100 * multiplier;
                    if (_time < (_distance100 / tr.Speed)) {
                        reject(`Οι τιμές είναι λάθος (αρνητικός χρόνος)`);
                    }
                    al.push({
                        timec: _time - (_distance100 / tr.Speed),
                        distance: 100 * multiplier,
                        speed: tr.Speed
                    });
                    multiplier += 1;
                }
            });
        });
        resolve(al);
    });
};
const foundFaster = (ac) => {
    let f100 = 0;
    let records = new Array();
    let multiplier = 1;
    records[0] = 0;
    records[multiplier] = 0;
    for (let i = 0; i < ac.length - multiplier; i++) {
        let ntime = ac[i + multiplier].timec - ac[i].timec;
        (records[multiplier] === 0) ? records[multiplier] = ntime : ((ntime < records[multiplier]) ? records[multiplier] = ntime : ntime = ntime);
    }
    console.log(functions_1.secsToTime(records[multiplier]));
};
/*getActivityFromFile(path.join(__dirname, 'nolap-running.tcx'), (error, act) => {
    if (!error) {
        let ac: Activity = act as Activity
        getPointsPer100m(ac).then((al) => {
            foundFaster(al)
        })
            .catch((error) => console.log(error))
    }
    else {
        console.log(`ERROR FOUND: ${error}`)
    }

})
*/
let from = new geoPoint_1.default(40.544325, 22.233317);
let to1 = new geoPoint_1.default(40, -73);
console.log(`${JSON.stringify(from)} ${JSON.stringify(to1)}`);
to1.LatitudeDegrees = 40;
console.log(JSON.stringify(functions_1.getNextPointCordinatesFromDistanceBearing(from, 100, 360)));
