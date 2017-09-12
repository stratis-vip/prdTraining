import * as constants  from '../../consts';

export default class Vo2maxClass {
    private _swimming: number = 20.0;
    private _bicycling: number = 21.0;
    private _running: number = 22.0;

    get running() { return this._running };
    set running(x) {
        if (x !== this._running && x > 10 && x < 120 && x < constants.MAXVO2MAX) {
            this._running = x;
        }
    }

    get bicycling() { return this._bicycling };
    set bicycling(x) {
        if (x !== this._bicycling && x > 10 && x < 120 && x < constants.MAXVO2MAX) {
            this._bicycling = x;           
        }
    }

    get swimming() { return this._swimming };
    set swimming(x) {
        if (x !== this._swimming && x > 10 && x < 120 && x < constants.MAXVO2MAX) {
            this._swimming = x;
        }
    }
}
