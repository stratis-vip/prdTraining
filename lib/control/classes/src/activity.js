"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const heartRate_1 = require("./heartRate");
const timeInZones_1 = require("./timeInZones");
const functions_1 = require("../../functions");
//TODO να προσθέσω και χρόνο σταματημένο
class Activity {
    constructor() {
        this._cadence = -1;
        this.toKm = () => {
            return this._distance / 1000;
        };
        this._HR = new heartRate_1.default();
        this._tiz = new timeInZones_1.default();
        this._start = new Date();
        this._laps = new Array();
    }
    // Στέλνει σινιάλο ότι άλλαξε μια μεταβλητή.
    // Μορφή ('change',[property],[value])
    get id() {
        return this._id;
    }
    set id(x) {
        (this._id !== x) ? this._id = x : this._id;
    }
    get athleteId() {
        return this._athleteId;
    }
    set athleteId(x) {
        (this._athleteId !== x) ? this._athleteId = x : this._athleteId;
    }
    get cadence() {
        return this._cadence;
    }
    set cadence(x) {
        (this._cadence !== x) ? this._cadence = x : this._cadence;
    }
    get name() {
        return this._name;
    }
    set name(x) {
        if (this._name !== x && x.trim().length > 4) {
            this._name = x;
        }
    }
    get totalTime() {
        return this._totalTime;
    }
    set totalTime(x) {
        if (this._totalTime !== x) {
            this._totalTime = x;
        }
    }
    get totalTimeString() {
        return functions_1.secsToTime(this._totalTime);
    }
    get distance() {
        return this._distance;
    }
    set distance(x) {
        if (this._distance !== x) {
            this._distance = x;
        }
    }
    get type() {
        return this._type;
    }
    set type(x) {
        if (this._type !== x) {
            this._type = x;
            this._subType = 0 /* Generic */;
        }
    }
    get subType() {
        return this._subType;
    }
    set subType(x) {
        if (this._subType !== x) {
            this._subType = x;
        }
    }
    get recs() {
        return this._recs;
    }
    set recs(x) {
        if (this._recs !== x) {
            this._recs = x;
        }
    }
    get HR() {
        return this._HR;
    }
    set HR(x) {
        if (this._HR !== x) {
            this._HR = x;
        }
    }
    get tiz() {
        return this._tiz;
    }
    set tiz(x) {
        if (this._tiz !== x) {
            this._tiz = x;
        }
    }
    get start() {
        return this._start;
    }
    set start(x) {
        if (this._start !== x) {
            this._start = x;
        }
    }
    get exoplismos() {
        return this._exoplismos;
    }
    set exoplismos(x) {
        if (this._exoplismos !== x) {
            this._exoplismos = x;
        }
    }
    get laps() {
        return this._laps;
    }
    set laps(x) {
        if (this._laps !== x) {
            this._laps = x;
        }
    }
    get calories() {
        return this._calories;
    }
    set calories(x) {
        if (this._calories !== x) {
            this._calories = x;
        }
    }
    get object() {
        return {
            id: this._id,
            athleteId: this._athleteId,
            // cadence: this._cadence,
            name: this._name,
            totalTime: this._totalTime,
            distance: this._distance,
            type: this._type,
            // subType: this._subType,
            //     HR: this._HR.object,
            //     recs: this._recs,
            //     tiz: this._tiz,
            start: this._start,
        };
    }
}
exports.default = Activity;
