"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tcxparser_1 = require("./parsers/tcxparser");
const getPointsPer100m = (activity) => {
    return new Promise((resolve, reject) => {
        if (activity === undefined) {
            reject(null);
        }
        let al = new Array();
        let multiplier = 1;
        activity.laps.forEach(lap => {
            lap.Track.forEach(tr => {
                if (tr.DistanceMeters - (100 * multiplier) > 0) {
                    let _time = (tr.Position.Time.getTime() - activity.start.getTime()) / 1000;
                    let _distance100 = tr.DistanceMeters - 100 * multiplier;
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
tcxparser_1.getActivityFromFile(path.join(__dirname, 'activity.tcx'), (error, act) => {
    if (!error) {
        let ac = act;
        getPointsPer100m(ac).then((al) => { console.log(al); }).catch((error) => console.log(error));
        // let al = [];
        // let multiplier = 1;
        // ac.laps.forEach(lap => {
        //     lap.Track.forEach(tr => {
        //         if (tr.DistanceMeters - (100 * multiplier) > 0) {
        //             let _time = (tr.Position.Time.getTime() - ac.start.getTime()) / 1000
        //             let _distance100 = tr.DistanceMeters - 100 * multiplier
        //             al.push(
        //                 {
        //                     timeC: _time - (_distance100 / tr.Speed),
        //                     extraDist: 100 * multiplier,
        //                     speed: tr.Speed
        //                 })
        //             multiplier += 1
        //         }
        //     })
        // })
        // al.forEach(a => {
        //     console.log(a)
        // })
    }
    else {
        console.log(`ERROR FOUND: ${error}`);
    }
});
