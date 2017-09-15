"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrackPointClass {
    constructor() { }
    get Time() {
        return this._Time;
    }
    set Time(value) {
        if (this._Time !== value) {
            this._Time = value;
        }
    }
    get LatitudeDegrees() {
        return this._LatitudeDegrees;
    }
    set LatitudeDegrees(x) {
        if (this._LatitudeDegrees !== x) {
            this._LatitudeDegrees = x;
        }
    }
    get LongitudeDegrees() {
        return this._LongitudeDegrees;
    }
    set LongitudeDegrees(x) {
        if (this._LongitudeDegrees !== x) {
            this._LongitudeDegrees = x;
        }
    }
    get AltitudeMeters() {
        return this._AltitudeMeters;
    }
    set AltitudeMeters(x) {
        if (this._AltitudeMeters !== x) {
            this._AltitudeMeters = x;
        }
    }
}
exports.default = TrackPointClass;
