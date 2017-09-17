"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
class Altitude extends events_1.EventEmitter {
    constructor(min, max, totalAsc, totalDesc) {
        super();
        this.toString = () => {
            return `Υψόμετρο:\nΕλάχιστοι: ${this._min} Μέγιστο: ${this._max}
        \nΥψομετρική διαφορά:\nΘετική: ${this._totalAsc} Αρνητική: ${this._totalDesc}`;
        };
        this._Emiter = new events_1.EventEmitter();
        (min) ? this._min = min : this._min = 0;
        (max) ? this._max = max : this._max = 0;
        (totalAsc) ? this._totalAsc = totalAsc : this._totalAsc = 0;
        (totalDesc) ? this._totalDesc = totalDesc : this._totalDesc = 0;
    }
    get Emiter() { return this._Emiter; }
    get min() { return this._min; }
    get max() { return this._max; }
    get totalAsc() { return this._totalAsc; }
    get totalDesc() { return this._totalDesc; }
    set min(x) {
        if (x !== this._min) {
            this._min = x;
            this._Emiter.emit('change', 'min', x);
        }
    }
    set max(x) {
        if (x !== this._max) {
            this._max = x;
            this._Emiter.emit('change', 'max', x);
        }
    }
    set totalAsc(x) {
        if (x !== this._totalAsc) {
            this._totalAsc = x;
            this._Emiter.emit('change', 'totalAsc', x);
        }
    }
    set totalDesc(x) {
        if (x !== this._totalDesc) {
            this._totalDesc = x;
            this._Emiter.emit('change', 'totalDesc', x);
        }
    }
}
exports.default = Altitude;
