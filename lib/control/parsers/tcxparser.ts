import * as path from "path";
import * as fs from "fs";
import { Activity, activitiesTypes } from "../classes/index";
import * as gp from "tcxparse";

import {
  iResult,
  getResult,
  getAuthor,
  getActivities,
  getLaps,
  fillLap,
  iLap,
  getTrack,
  iPoint,
  fillPoint
} from "./tcxinterfaces";

/**
 * Ανοίγει ένα αρχείο TCX (filename) και φορτώνει τα δεδομένα που με απασχολούν σε
 * αντικείμενο Activity
 * @param {string} filename η πλήρης διαδρομή στο αρχείο ΤCX
 * @returns ένα αντικείμενο Activity ή null (σε περίπτωση λάθους)
 */
export const getActivityFromFile = (filename: string, CallBack): void => {
  let act =   new Activity();
  // fs.readFile(filename, "utf8", (err, data) => {
  //   if (err) {
  //     console.log(err.message);
  //   } else {
      gp.parseFile(filename, (err, tcxData) => {
        if (!err) {
          let resultObject: iResult = getResult(tcxData);
          let author = getAuthor(resultObject);
          let activitiesObject = getActivities(resultObject);
          let laps = getLaps(activitiesObject[0]);
          act = new Activity();
          act.name = activitiesObject[0].Activity[0].Id[0];
          act.type = activitiesTypes[activitiesObject[0].Activity[0].$.Sport];

          act.totalTime = 0;
          act.distance = 0;
          act.calories = 0;
          let count = 1;
          let maxHR = 0;
          let avgHR = 0;
          let maxSpeed = 0;
          let avgCadence = 0;
          laps.forEach((tcxLap: iLap) => {
            let lap = fillLap(tcxLap);
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

            let points = getTrack(tcxLap);
            points.forEach((point: iPoint) => {
              lap.Track.push(fillPoint(point));
            }); //<-forEach point
            act.laps.push(lap);
          });

          avgHR /= laps.length;
          avgCadence /= laps.length;
          CallBack(null,act)
        } else {
          CallBack(err.message, act);
        }
      });
//    }

  }



