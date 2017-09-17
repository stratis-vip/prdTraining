"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("../../consts");
class Vo2maxClass {
    constructor() {
        this._swimming = 20.0;
        this._bicycling = 21.0;
        this._running = 22.0;
    }
    get running() { return this._running; }
    ;
    set running(x) {
        if (x !== this._running && x > 10 && x < 120 && x < constants.MAXVO2MAX) {
            this._running = x;
        }
    }
    get bicycling() { return this._bicycling; }
    ;
    set bicycling(x) {
        if (x !== this._bicycling && x > 10 && x < 120 && x < constants.MAXVO2MAX) {
            this._bicycling = x;
        }
    }
    get swimming() { return this._swimming; }
    ;
    set swimming(x) {
        if (x !== this._swimming && x > 10 && x < 120 && x < constants.MAXVO2MAX) {
            this._swimming = x;
        }
    }
}
exports.default = Vo2maxClass;
