import {activitiesTypes, activitiesSubTypes} from '../../enums'
import Record from './records'
import HeartRate from './heartRate'
import TimeInZones from './timeInZones'
import Exoplismos from './exoplismos'
import Lap from './lap'

//TODO να προσθέσω και χρόνο σταματημένο
export default class Activity{
    private _athleteId: number;
    private _name: string;
    private _totalTime: number;
    private _distance: number;
    private _type: activitiesTypes;
    private _subType: activitiesSubTypes;
    private _recs: Array<Record>;
    private _HR: HeartRate;
    private _tiz: TimeInZones;
    private _start: Date;
    private _exoplismos: Array<Exoplismos>
    private _laps: Array<Lap>
}
