export default class Lap {
    private _StartTime:Date
    private _TotalTimeSeconds:number
    private _DistanceMeters: number
    private _MaximumSpeed: number
    private _Calories: number
    private _AverageHeartRateBpm: number
    private _MaximumHeartRateBpm: {}
    private _Cadence: number =-1
    private _Track: Array<{}>
    private _Extensions: Array<{}>
    
    get StartTime(){
        return this._StartTime
    }

    set StartTime (x) {
        if (this._StartTime !== x){
            this._StartTime = x;
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

}