import {activitiesTypes, activitiesSubTypes} from '../../enums'
import Record from './records'
import HeartRate from './heartRate'
import TimeInZones from './timeInZones'
import Exoplismos from './exoplismos'
import Lap from './lap'
import { EventEmitter } from 'events';


//TODO να προσθέσω και χρόνο σταματημένο
export default class Activity extends EventEmitter{
    private _activityId:number;
    private _Emiter:EventEmitter;
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
    constructor () {
        super()   
        this._Emiter = new EventEmitter()   
        this._HR= new HeartRate();
        this._tiz = new TimeInZones();
        this._start = new Date();
        this._laps = new Array<Lap>()
    }

    // Στέλνει σινιάλο ότι άλλαξε μια μεταβλητή.
    // Μορφή ('change',[property],[value])
    get Emiter() {
        return this._Emiter;
    }

    get activityId () {
        return this._activityId;        
    }

    set activityId(x){
        (this._activityId !== x) ? this._activityId =x : this._activityId;
    }

    get athleteId (){
        return this._athleteId;
    }
    set athleteId(x){
        (this._athleteId !== x) ? this._athleteId =x : this._athleteId;
    }

    get name() {
        return this._name;
    }
    set name(x){
        if (this._name !== x && x.trim().length>4){
            this._name =x
            this._Emiter.emit('change','name',x);
        }
    }

    get totalTime() {
        return this._totalTime;
    }
    set totalTime(x){
        if (this._totalTime !== x && x > 0){
            this._totalTime =x
            this._Emiter.emit('change','totalTime',x);
        }
    }

    get distance() {
        return this._distance;
    }
    set distance(x){
        if (this._distance !== x && x > 0){
            this._distance =x
            this._Emiter.emit('change','distance',x);
        }
    }
    
    get type() {
        return this._type;
    }
    set type(x){
        if (this._type !== x){
            this._type =x
            this._subType=activitiesSubTypes.Generic;
            this._Emiter.emit('change','type',x);
        }
    }

    get subType() {
        return this._subType;
    }
    set subType(x){
        if (this._subType !== x){
            this._subType =x
            this._Emiter.emit('change','subType',x);
        }
    }

    get recs() {
        return this._recs;
    }
    set recs(x){
        if (this._recs !== x){
            this._recs =x
            this._Emiter.emit('change','recs',x);
        }
    }  

    get HR() {
        return this._HR;
    }
    set HR(x){
        if (this._HR !== x){
            this._HR =x
            this._Emiter.emit('change','HR',x);
        }
    }  

    get tiz() {
        return this._tiz;
    }
    set tiz(x){
        if (this._tiz !== x){
            this._tiz =x
            this._Emiter.emit('change','tiz',x);
        }
    }  
    get start() {
        return this._start;
    }
    set start(x){
        if (this._start !== x){
            this._start =x
            this._Emiter.emit('change','start',x);
        }
    }  
    get exoplismos() {
        return this._exoplismos;
    }
    set exoplismos(x){
        if (this._exoplismos !== x){
            this._exoplismos =x
            this._Emiter.emit('change','exoplismos',x);
        }
    }  
    get laps() {
        return this._laps;
    }
    set laps(x){
        if (this._laps !== x){
            this._laps =x
            this._Emiter.emit('change','laps',x);
        }
    }  







}
