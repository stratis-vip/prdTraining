"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const events_1 = require("events");
class HeartRate extends events_1.EventEmitter {
    constructor(lhr, mhr, ahr) {
        super();
        this.toString = () => {
            return `Καρδιακοί παλμοί:\nΕλάχιστοι: ${this._lHR} Μέγιστοι: ${this._mHR} Μέσος όρος: ${this._aHR}`;
        };
        this._Emiter = new events_1.EventEmitter();
        (lhr) ? this._lHR = lhr : this._lHR = 50;
        (mhr) ? this._mHR = mhr : this._mHR = 160;
        (ahr) ? this._aHR = ahr : this._aHR = 105;
    }
    get Emiter() {
        return this._Emiter;
    }
    get aHR() { return this._aHR; }
    get lHR() { return this._lHR; }
    get mHR() { return this._mHR; }
    set aHR(x) {
        if ((x <= consts_1.MAXHEARTRATE && x >= consts_1.MINHEARTRATE)) {
            this._aHR = x;
            this._Emiter.emit('change', 'aHR', x);
        }
    }
    set lHR(x) {
        if ((x <= consts_1.MAXHEARTRATE && x >= consts_1.MINHEARTRATE)) {
            this._lHR = x;
            this._Emiter.emit('change', 'lHR', x);
        }
    }
    set mHR(x) {
        if ((x <= consts_1.MAXHEARTRATE && x >= consts_1.MINHEARTRATE)) {
            this._mHR = x;
            this._Emiter.emit('change', 'mHR', x);
        }
    }
}
exports.default = HeartRate;
