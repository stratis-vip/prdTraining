
import * as fs from 'fs';
import * as path from 'path';
import { getActivities, getAuthor, getLaps, getResult, iLap, iPoint, iResult } from './classes/src/interfaces';
import Lap from './classes/src/lap';
import Track from './classes/src/track';
import TrackPointClass from './classes/src/trackpoint';
import * as console from 'console';
import { Activity, activitiesTypes } from "./classes/index";
import * as gp from 'tcxparse';

let act = new Activity();

let data = fs.readFileSync(path.join(__dirname, "test.tcx"), "utf8");

gp.parseFile(path.join(__dirname, "test.tcx"), (err, tcxData) => {
  if (!err) {
  //  console.log(JSON.stringify(tcxData,null,2))
    
    let resultObject: iResult = getResult(tcxData);
    let author = getAuthor(resultObject);
    let activitiesObject = getActivities(resultObject);     
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
    let avgCadence = 0;
    laps.forEach((tcxLap: iLap) => {
      let lap = new Lap();
      lap.StartTime = new Date(tcxLap.$.StartTime);
      if (count === 1) {
        act.start = lap.StartTime;
      }
      lap.TotalTimeSeconds = Number(tcxLap.TotalTimeSeconds[0]);
      lap.DistanceMeters = Number(tcxLap.DistanceMeters[0]);
      act.distance += Number(lap.DistanceMeters);
      act.totalTime += Number(lap.TotalTimeSeconds);
      lap.Calories = Number(tcxLap.Calories[0]);
      lap.AvgSpeed = Number(tcxLap.Extensions[0].LX[0].AvgSpeed[0]);
      lap.Cadence = Number(tcxLap.Cadence[0]);
      avgCadence += Number(lap.Cadence);
      act.calories += Number(lap.Calories);

      lap.AverageHeartRateBpm = Number(tcxLap.AverageHeartRateBpm[0].Value[0]);
      avgHR += Number(lap.AverageHeartRateBpm);
      lap.MaximumHeartRateBpm = Number(tcxLap.MaximumHeartRateBpm[0].Value[0]);
      if (maxHR < lap.MaximumHeartRateBpm) {
        maxHR = lap.MaximumHeartRateBpm;
      }
      lap.MaximumSpeed = Number(tcxLap.MaximumSpeed[0]);

      if (lap.MaximumSpeed > maxSpeed) {
        maxSpeed = lap.MaximumSpeed;
      }
      let points = (tcxLap as iLap).Track[0].Trackpoint;
      points.forEach((point: iPoint) => {
        let trackPoint = new Track();
        let trackPosition = new TrackPointClass();
        trackPosition.Time = new Date(point.Time[0]);
        trackPosition.LongitudeDegrees = Number(point.Position[0].LongitudeDegrees[0]);
        trackPosition.LatitudeDegrees = Number(point.Position[0].LatitudeDegrees[0]);
        trackPosition.AltitudeMeters = Number(point.AltitudeMeters[0]);
        trackPoint.DistanceMeters = Number(point.DistanceMeters[0]);
        trackPoint.HeartRateBpm = Number(point.HeartRateBpm[0].Value[0]);
        trackPoint.Cadence = Number(point.Cadence[0]);
        trackPoint.Speed = Number(point.Extensions[0].TPX[0].Speed[0]);
        trackPoint.Position = trackPosition;
        lap.Track.push(trackPoint);
      }); //<-forEach point
      act.laps.push(lap)
    });

    avgHR /= laps.length;
    avgCadence /= laps.length;

    console.log(JSON.stringify(act,null,2))
  } else {
    console.log(err.message);
  }
});
