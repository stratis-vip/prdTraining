/**
 * Γενικό Interface για τα αποτελέσματα που διαβάζει o TCX αναγνώστης.
 * <br>Είναι το πατρικό αντικείμενο που από κει και πέρα όλα τα υπόλοιπα ακολουθούν
 * @desc 
 * το αντικείμενο που επιστρέφει ο αναγνώστης έχει την παρακάτω μορφή
 * <pre>
 * {
 * "result": 
 *   {
 *     "TrainingCenterDatabase": { 
  *      "$": [{}],
 *       "Activities": [{iActivity},..,{iActivity}] 
 *       "Author": [{iAuthor},..,{iAuthor}]
 *     }
 *   }
 * }
 * </pre>
 */
export interface iResult {
  result: iTrainingCenterDatabase;
}

export interface iTrainingCenterDatabase {
  TrainingCenterDatabase: {
    $: {};
    Activities: Array<iActivity>;
    Author: Array<iAuthor>;
  };

}

export interface iAuthor {
  $: {
    xsi_type: string;
  };
  Name: Array<string>;
  Build: Array<{}>;
  LangID: Array<string>;
  PartNumber: Array<string>;
}

export interface iBuildVersion {
  Version: Array<{}>;
}

export interface iLap {
  $: {
    StartTime: string;
  };
  TotalTimeSeconds: Array<number>;
  DistanceMeters: Array<number>;
  MaximumSpeed: Array<number>;
  Calories: Array<number>;
  AverageHeartRateBpm: Array<iHeartRate>;
  MaximumHeartRateBpm: Array<iHeartRate>;
  Cadence: Array<number>;
  Track: Array<iTrackPoints>;
  Extensions: Array<iExtensionsLX>;
}

export interface iTrackPoints {
  Trackpoint: Array<iPoint>;
}

export interface iPoint
{
  Time: Array<number>;
  Position: Array<{
    LatitudeDegrees: Array<number>;
    LongitudeDegrees: Array<number>;
  }>;
  AltitudeMeters: Array<number>;
  DistanceMeters: Array<number>;
  HeartRateBpm: Array<{
    $: {
      xsi_type: string;
    };
    Value: Array<number>;
  }>;
  Cadence: Array<number>;
  Extensions: Array<{
    TPX: Array<{
      $: {
        xmlns: string;
      };
      Speed: Array<number>;
    }>;
  }>;
}

interface iExtensionsLX {
  LX: Array<{
    $: string;
    AvgSpeed: Array<number>;
  }>;
}

interface iHeartRate {
  Value: Array<number>;
}

export interface iActivity {
  Activity: Array<{
    $: {
      Sport: string;
    };
    Id: Array<string>;
    Lap: Array<iLap>;
  }>;
}

/**
 * Συμπληρώνει το αντικείμενο iResult από το αντικείμενο που διάβασε ο αναγνώστης TCX 
 * @param {iResult} data το αντικείμενο όπως το διάβασε ο αναγνώστης TCX
 * @returns iResult το αντικείμενο σε μορφή που μπορώ να το διαχειριστώ καλύτερα
 */
export const getResult = (data: iResult | any): iResult => {
 
  return data;
};

/**
 * Συμπληρώνει ένα πίνακα με αντικείμενα iAcitivity από το πηγαίο αντικείμενο iResult
 * @param {iResult} data το αντικείμενο που επέστρεψε ο αναγνώστης TCX
 * @returns Array<iActivity> πίνακας με τις δραστηριότητες iActivity
 */
export const getActivities = (data: iResult): Array<iActivity> => {
  return data.result.TrainingCenterDatabase.Activities;
};

/**
 * Συμπληρώνει τη δομή iAuthor 
 * @param {iResult} data το αντικείμενο που επέστρεψε ο αναγνώστης TCX
 * @returns Array<iAuthor> πίνακας με τα αντικείμενα iAuthor (μπορεί να είναι περισσότερα)
 */
export const getAuthor = (data: iResult): Array<iAuthor> => {
  return data.result.TrainingCenterDatabase.Author;
};

export const getLaps = (data: iActivity): Array<{}> => {
  return data.Activity[0].Lap;
};
