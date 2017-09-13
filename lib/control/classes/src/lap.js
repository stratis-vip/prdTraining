"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Lap {
    constructor() {
        this._Cadence = -1;
    }
    get StartTime() {
        return this._StartTime;
    }
    set StartTime(x) {
        if (this._StartTime !== x) {
            this._StartTime = x;
        }
    }
    get AverageHeartRateBpm() {
        return this._AverageHeartRateBpm;
    }
    set AverageHeartRateBpm(x) {
        if (this._AverageHeartRateBpm !== x) {
            this._AverageHeartRateBpm = x;
        }
    }
}
exports.default = Lap;
