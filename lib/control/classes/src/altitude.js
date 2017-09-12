"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../../functions");
class Altitude {
    constructor(min, max, totalAsc, totalDesc) {
        this.toString = () => {
            return `Υψόμετρο:\nΕλάχιστοι: ${this._min} Μέγιστο: ${this._max}
        \nΥψομετρική διαφορά:\nΘετική: ${this._totalAsc} Αρνητική: ${this._totalDesc}`;
        };
        (min) ? this._min = min : this._min = 0;
        (max) ? this._max = max : this._max = 0;
        (totalAsc) ? this._totalAsc = totalAsc : this._totalAsc = 0;
        (totalDesc) ? this._totalDesc = totalDesc : this._totalDesc = 0;
    }
    get min() { return this._min; }
    get max() { return this._max; }
    get totalAsc() { return this._totalAsc; }
    get totalDesc() { return this._totalDesc; }
    set min(x) {
        if (x !== this._min) {
            this._min = x;
            functions_1.updateAltitude(this, 'min', x);
        }
    }
    set max(x) {
        if (x !== this._max) {
            this._max = x;
            functions_1.updateAltitude(this, 'max', x);
        }
    }
    set totalAsc(x) {
        if (x !== this._totalAsc) {
            this._totalAsc = x;
            functions_1.updateAltitude(this, 'totalAsc', x);
        }
    }
    set totalDesc(x) {
        if (x !== this._totalDesc) {
            this._totalDesc = x;
            functions_1.updateAltitude(this, 'totalDesc', x);
        }
    }
}
exports.default = Altitude;
