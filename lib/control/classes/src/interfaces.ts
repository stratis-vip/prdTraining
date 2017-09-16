/**
 * Γενικό Interface για τα αποτελέσματα που διαβάζει o TCX αναγνώστης.
 * <br>Είναι το πατρικό αντικείμενο που από κει και πέρα όλα τα υπόλοιπα ακολουθούν
 * @interface
 */
function iResult() {
  let result: iTrainingCenterDatabase;
  let TrainingCenterDatabase: iTrainingCenterDatabase;  
}
export interface iResult {
  result: iTrainingCenterDatabase;
  TrainingCenterDatabase: iTrainingCenterDatabase;
}

/**
 * Get the color as an array of red, green, and blue values, represented as
 * decimal numbers between 0 and 1.
 *
 * @returns {Array<number>} An array containing the red, green, and blue values,
 * in that order.
 */
iResult.prototype.rgb = function() {
    throw new Error('not implemented');
};

/**
 * Class representing a color with transparency information.
 *
 * @class
 * @implements {iResult}
 */
function TransparentColor() {}

// inherits the documentation from `Color#rgb`
TransparentColor.prototype.rgb = function() {
    // ...
};

/**
 * Get the color as an array of red, green, blue, and alpha values, represented
 * as decimal numbers between 0 and 1.
 *
 * @returns {Array<number>} An array containing the red, green, blue, and alpha
 * values, in that order.
 */
TransparentColor.prototype.rgba = function() {
    // ...
};


/**
 * Interface for classes that represent a color.
 * @interface  
 */


export interface iTrainingCenterDatabase {
  TrainingCenterDatabase: {
    $: {};
    Activities: Array<iActivity>;
    Author: Array<{}>;
  };
  Activities: Array<iActivity>;
  Author: Array<iAuthor>;
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

export const getResult = (data: iResult | any): iResult => {
  return data.result;
};

export const getActivities = (data: iResult): Array<iActivity> => {
  return data.TrainingCenterDatabase.Activities;
};

export const getAuthor = (data: iResult): Array<iAuthor> => {
  return data.TrainingCenterDatabase.Author;
};

export const getLaps = (data: iActivity): Array<{}> => {
  return data.Activity[0].Lap;
};
