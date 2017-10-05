"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./classes/index");
const functions_1 = require("./functions");
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

let from= new geoPoint(40.544325,22.233317)
let to1 = new geoPoint(40,-73)
console.log(`${JSON.stringify(from)} ${JSON.stringify(to1)}`)
to1.LatitudeDegrees = 40
console.log(JSON.stringify(getNextPointCordinatesFromDistanceBearing(from,100,360)))
*/
// let testDB = new DB()
// testDB.getAthites((err, arr) => {
//   //  console.log(JSON.stringify(arr, null, 2))
// })
// console.log(`finished'`)
// testDB.Emiter.on('error', (value) => {
//     console.log(value)
//     //testDB.end();
// })
// testDB.Emiter.on('finish', (value) => {
//     console.log(value)
//     console.log(`finished'`)
// })
// //process.abort()
// let id ='stratis.vip@gmail.com'
// testDB.findAthlitiByMail(id,(err,answer, athlete)=>{
//     if (err) {
//         return console.log(`findAthlitiById raised Error ${err}`)
//     }
//     if (answer){
//         console.log(`Athlete with id ${id} exists: ${(athlete[0] as Athlete).vo2max.running}`)
//     }else { console.log(`athlete whith id ${id} doesn't exist`)}
// })
var datejs = require("datejs");
let a = new Date('2017-09-28T05:41:20.000Z');
let b = new index_1.Athlete();
console.log(b.sbday);
console.log(functions_1.isInCurrentWeek('2017-09-27T05:41:20.000Z'));
