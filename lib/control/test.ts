import * as path from 'path';
import { getActivityFromFile } from "./parsers/tcxparser";
import { Activity } from './classes/index';
import { secsToTime } from './functions';

interface PointsPer100m {
    timec: number;
    distance: number;
    speed: number;
}

const getPointsPer100m = (activity: Activity) => {
    return new Promise<Array<PointsPer100m>>((resolve, reject) => {
        if (activity === undefined) { reject(`Η δραστηριότητα είναι άκυρη`) }
        let al = new Array<PointsPer100m>();
        let multiplier = 1;
        activity.laps.forEach(lap => {
            lap.Track.forEach(tr => {
                if (tr.DistanceMeters - (100 * multiplier) > 0) {
                    let _time = (tr.Position.Time.getTime() - activity.start.getTime()) / 1000
                    let _distance100 = tr.DistanceMeters - 100 * multiplier
                    if (_time < (_distance100 / tr.Speed)) {
                        reject(`Οι τιμές είναι λάθος (αρνητικός χρόνος)`)
                    }
                    al.push(
                        {
                            timec: _time - (_distance100 / tr.Speed),
                            distance: 100 * multiplier,
                            speed: tr.Speed
                        })
                    multiplier += 1
                }
            })
        })
        resolve(al)
    })
}

interface iFasterTimes {
    faster100: number;
}
const foundFaster = (ac: Array<PointsPer100m>) => {
    let f100: number = 0;
    let records: Array<number> = new Array<number>()
    let multiplier: number = 1
    records[0] = 0
    records[multiplier] = 0
    for (let i = 0; i < ac.length - multiplier; i++) {
        let ntime = ac[i + multiplier].timec - ac[i].timec
            ; (records[multiplier] === 0) ? records[multiplier] = ntime : ((ntime < records[multiplier]) ? records[multiplier] = ntime : ntime = ntime)
    }
    console.log(secsToTime(records[multiplier]))
}

getActivityFromFile(path.join(__dirname, 'nolap-running.tcx'), (error, act) => {
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
