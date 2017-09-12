"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../consts");
const functions_1 = require("../functions");
class HeartRate {
    constructor(lhr, mhr, ahr) {
        this.toString = () => {
            return `Καρδιακοί παλμοί:\nΕλάχιστοι: ${this._lHR} Μέγιστοι: ${this._mHR} Μέσος όρος: ${this._aHR}`;
        };
        (lhr) ? this._lHR = lhr : this._lHR = 50;
        (mhr) ? this._mHR = mhr : this._mHR = 160;
        (ahr) ? this._aHR = ahr : this._aHR = 105;
    }
    get aHR() { return this._aHR; }
    get lHR() { return this._lHR; }
    get mHR() { return this._mHR; }
    set aHR(x) {
        if ((x <= consts_1.MAXHEARTRATE && x >= consts_1.MINHEARTRATE)) {
            this._aHR = x;
            functions_1.updateHeartRate(this, 'aHR', x);
        }
    }
    set lHR(x) {
        if ((x <= consts_1.MAXHEARTRATE && x >= consts_1.MINHEARTRATE)) {
            this._lHR = x;
            functions_1.updateHeartRate(this, 'lHR', x);
        }
    }
    set mHR(x) {
        if ((x <= consts_1.MAXHEARTRATE && x >= consts_1.MINHEARTRATE)) {
            this._mHR = x;
            functions_1.updateHeartRate(this, 'mHR', x);
        }
    }
}
exports.default = HeartRate;
