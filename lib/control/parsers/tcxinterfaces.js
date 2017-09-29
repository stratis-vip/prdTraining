"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../classes/index");
/**
 * Συμπληρώνει το αντικείμενο iResult από το αντικείμενο που διάβασε ο αναγνώστης TCX
 * @param {iResult} data το αντικείμενο όπως το διάβασε ο αναγνώστης TCX
 * @returns iResult το αντικείμενο σε μορφή που μπορώ να το διαχειριστώ καλύτερα
 */
exports.getResult = (data) => {
    return data;
};
/**
 * Συμπληρώνει ένα πίνακα με αντικείμενα iAcitivity από το πηγαίο αντικείμενο iResult
 * @param {iResult} data το αντικείμενο που επέστρεψε ο αναγνώστης TCX
 * @returns Array<iActivity> πίνακας με τις δραστηριότητες iActivity
 */
exports.getActivities = (data) => {
    return data.result.TrainingCenterDatabase.Activities;
};
/**
 * Συμπληρώνει τη δομή iAuthor
 * @param {iResult} data το αντικείμενο που επέστρεψε ο αναγνώστης TCX
 * @returns Array<iAuthor> πίνακας με τα αντικείμενα iAuthor (μπορεί να είναι περισσότερα)
 */
exports.getAuthor = (data) => {
    return data.result.TrainingCenterDatabase.Author;
};
/**
 * Συμπληρώνει τους γύρους που έχει καταγεγγραμένο το αρχείο
 * @param {iActivity} data η δραστηριότητα
 * @returns Array<iLap> πίνακας με τα ανιτκείμενα iLap
 */
exports.getLaps = (data) => {
    return data.Activity[0].Lap;
};
/**
 * Συμπληρώνει τα σημεία GPS που έχει ο συγκεκριμένος γύρος (tcxLap)
 * @param {iLap} tcxLap ο γύρος (lap) από το πρωτότυπο αρχείο tcx
 * @returns Array<iPoint> πίνακας με τα ανιτκείμενα iPoint
 *  */
exports.getTrack = (tcxLap) => {
    return tcxLap.Track[0].Trackpoint;
};
exports.fillLap = (tcxLap) => {
    let lap = new index_1.Lap();
    lap.StartTime = new Date(tcxLap.$.StartTime);
    lap.TotalTimeSeconds = Number(tcxLap.TotalTimeSeconds[0]);
    lap.DistanceMeters = Number(tcxLap.DistanceMeters[0]);
    lap.Calories = Number(tcxLap.Calories[0]);
    ;
    tcxLap.Extensions.forEach(element => {
        for (let el in element) {
            switch (el) {
                case "LX":
                    lap.AvgSpeed = Number(element["LX"]["0"]["AvgSpeed"]["0"]);
                    break;
                case "ns3:LX":
                    lap.AvgSpeed = Number(element["ns3:LX"]["0"]["ns3:AvgSpeed"]["0"]);
                    if (element["ns3:LX"]["0"]["ns3:AvgRunCadence"] !== undefined) {
                        lap.Cadence = Number(element["ns3:LX"]["0"]["ns3:AvgRunCadence"]["0"]);
                    }
                    else {
                        if (element["ns3:LX"]["0"]["ns3:MaxBikeCadence"] !== undefined) {
                            lap.Cadence = Number(element["ns3:LX"]["0"]["ns3:MaxBikeCadence"]["0"]);
                        }
                        else {
                            lap.Cadence = -1;
                        }
                    }
                    break;
                default:
                    lap.AvgSpeed = -1;
                    break;
            }
        }
    });
    if (tcxLap.Cadence !== undefined) {
        lap.Cadence = Number(tcxLap.Cadence[0]);
    }
    lap.AverageHeartRateBpm = Number(tcxLap.AverageHeartRateBpm[0].Value[0]);
    lap.MaximumHeartRateBpm = Number(tcxLap.MaximumHeartRateBpm[0].Value[0]);
    lap.MaximumSpeed = Number(tcxLap.MaximumSpeed[0]);
    return lap;
};
exports.fillPoint = (point) => {
    let trackPoint = new index_1.Track();
    let trackPosition = new index_1.TrackPointClass();
    trackPosition.Time = new Date(point.Time[0]);
    if (point.Position) {
        trackPosition.LongitudeDegrees = Number(point.Position[0].LongitudeDegrees[0]);
        trackPosition.LatitudeDegrees = Number(point.Position[0].LatitudeDegrees[0]);
    }
    else {
        trackPosition.LongitudeDegrees = trackPosition.LatitudeDegrees = 0;
    }
    trackPosition.AltitudeMeters = Number(point.AltitudeMeters[0]);
    trackPoint.DistanceMeters = Number(point.DistanceMeters[0]);
    //Στις περιπτώσεις που για οποιοδήποτε λόγο δεν κράτησε καρδιακό παλμό δώσε τιμή -1
    if (point.HeartRateBpm === undefined) {
        trackPoint.HeartRateBpm = -1;
    }
    else {
        trackPoint.HeartRateBpm = Number(point.HeartRateBpm[0].Value[0]);
    }
    ;
    point.Extensions.forEach(element => {
        for (let el in element) {
            switch (el) {
                case "TPX":
                    trackPoint.Speed = Number(element["TPX"]["0"]["Speed"]["0"]);
                    if (point.Cadence !== undefined) {
                        trackPoint.RunCadence = Number(point.Cadence[0]);
                        trackPoint.BikeCadence = Number(point.Cadence[0]);
                    }
                    break;
                case "ns3:TPX":
                    trackPoint.Speed = Number(element["ns3:TPX"]["0"]["ns3:Speed"]["0"]);
                    break;
                default:
                    break;
            }
        }
    });
    trackPoint.Position = trackPosition;
    return trackPoint;
};
