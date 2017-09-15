import Athlete from './src/athlete';
import Vo2maxClass from './src/vo2max';
import HeartRate from './src/heartRate';
import Altitude from './src/altitude';
import Activity from './src/activity';
import Record from './src/records'
import TimeInZones from './src/timeInZones'
import Exoplismos from './src/exoplismos'
import Lap from './src/lap'
import Track from './src/track';
import {sex, activitiesTypes, activitiesSubTypes} from '../enums'

import {MINWEIGHT,MAXWEIGHT, MINHEIGHT, MAXHEIGHT, MAXVO2MAX, MINHEARTRATE, MAXHEARTRATE} from '../consts';

class dummy{}

export {
        Activity, activitiesTypes, activitiesSubTypes, Altitude, Athlete,
        dummy,
        Exoplismos,
        HeartRate,
        Lap,
        MAXHEARTRATE, MAXHEIGHT, MAXVO2MAX, MAXWEIGHT, MINHEARTRATE, MINHEIGHT, MINWEIGHT,
        Record,
        sex,
        TimeInZones, Track,
        Vo2maxClass
    }