"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const trackpoint_1 = require("./trackpoint");
class Track {
    constructor() {
        this._Position = new trackpoint_1.default();
    }
    /**
     * Συντόμευση στο χρόνο που αποθηκεύεται στο αντικείμενο Position
     */
    get Time() {
        return this._Position.Time;
    }
    get Position() {
        return this._Position;
    }
    set Position(x) {
        if (this._Position !== x) {
            this._Position = x;
        }
    }
    get DistanceMeters() {
        return this._DistanceMeters;
    }
    set DistanceMeters(x) {
        if (this._DistanceMeters !== x) {
            this._DistanceMeters = x;
        }
    }
    get HeartRateBpm() {
        return this._HeartRateBpm;
    }
    set HeartRateBpm(x) {
        if (this._HeartRateBpm !== x) {
            this._HeartRateBpm = x;
        }
    }
    get RunCadence() {
        return this._RunCadence;
    }
    set RunCadence(x) {
        if (this._RunCadence !== x) {
            this._RunCadence = x;
        }
    }
    get BikeCadence() {
        return this._BikeCadence;
    }
    set BikeCadence(x) {
        if (this._BikeCadence !== x) {
            this._BikeCadence = x;
        }
    }
    get Speed() {
        return this._Speed;
    }
    set Speed(x) {
        if (this._Speed !== x) {
            this._Speed = x;
        }
    }
}
exports.default = Track;
