﻿import Track from './track';
/**
 * @class Lap
 * Κρατά
 */
export default class Lap {
    private _AverageHeartRateBpm: number
    private _AvgSpeed:number = -1
    private _Cadence: number =-1
    private _Calories: number
    private _DistanceMeters: number
    private _Extensions: Array<{}>
    private _MaximumHeartRateBpm: number
    private _MaximumSpeed: number    
    private _StartTime:Date
    private _TotalTimeSeconds:number
    private _Tracks: Array<Track>;

    constructor(){
        this._Tracks = new Array<Track>()
    }

	public get Track(): Array<Track> {
		return this._Tracks;
	}

	public set Track(value: Array<Track>) {
		if (this._Tracks !== value){
            this._Tracks = value;
        }
    }
    
    get AverageHeartRateBpm(){
        return this._AverageHeartRateBpm
    }
    set AverageHeartRateBpm (x) {
        if (this._AverageHeartRateBpm !== x){
            this._AverageHeartRateBpm = x;
        }
    }
    get AvgSpeed(){
        return this._AvgSpeed
    }
    set AvgSpeed (x) {
        if (this._AvgSpeed !== x){
            this._AvgSpeed = x;
        }
    }
    get Cadence(){
        return this._Cadence
    }
    set Cadence (x) {
        if (this._Cadence !== x){
            this._Cadence = x;
        }
    }
    get Calories(){
        return this._Calories
    }
    set Calories (x) {
        if (this._Calories !== x){
            this._Calories = x;
        }
    }
    get DistanceMeters(){
        return this._DistanceMeters
    }
    set DistanceMeters (x) {
        if (this._DistanceMeters !== x){
            this._DistanceMeters = x;
        }
    }
    get MaximumHeartRateBpm(){
        return this._MaximumHeartRateBpm
    }
    set MaximumHeartRateBpm (x) {
        if (this._MaximumHeartRateBpm !== x){
            this._MaximumHeartRateBpm = x;
        }
    }
    get MaximumSpeed(){
        return this._MaximumSpeed
    }
    set MaximumSpeed (x) {
        if (this._MaximumSpeed !== x){
            this._MaximumSpeed = x;
        }
    }
    get StartTime(){
        return this._StartTime
    }
    set StartTime (x) {
        if (this._StartTime !== x){
            this._StartTime = x;
        }
    }  
    get TotalTimeSeconds(){
        return this._TotalTimeSeconds
    }
    set TotalTimeSeconds (x) {
        if (this._TotalTimeSeconds !== x){
            this._TotalTimeSeconds = x;
        }
    }  
}