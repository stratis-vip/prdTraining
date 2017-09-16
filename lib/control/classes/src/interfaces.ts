import * as stream from 'stream';
export interface iResult {
  result: iTrainingCenterDatabase;
  TrainingCenterDatabase: iTrainingCenterDatabase;
}

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
  Track: Array<{}>;
  Extensions: Array<iExtensionsLX>;
}

interface iExtensionsLX{
    LX: Array<{
        $:string
        AvgSpeed:Array<number>
    }>

}

interface iHeartRate {
    Value:Array<number>
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
