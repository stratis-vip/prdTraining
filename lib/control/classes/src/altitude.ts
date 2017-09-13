import { EventEmitter } from "events";

export default class Altitude extends EventEmitter{
    private _min : number;
    private _max : number;
    private _totalAsc : number;
    private _totalDesc : number;
    private _Emiter : EventEmitter;
    constructor(min?:number, max?:number,totalAsc?:number, totalDesc?:number){
        super();
        this._Emiter = new EventEmitter();
        (min) ? this._min = min : this._min = 0;
        (max) ? this._max = max : this._max = 0;
        (totalAsc) ? this._totalAsc = totalAsc : this._totalAsc = 0;
        (totalDesc) ? this._totalDesc = totalDesc : this._totalDesc = 0;
    }

    get Emiter () { return this._Emiter}
    get min () { return this._min;}
    get max () { return this._max;}
    get totalAsc () { return this._totalAsc;}
    get totalDesc () { return this._totalDesc;}

    set min (x) {
        if (x !== this._min){
            this._min = x;
            this._Emiter.emit('change', 'min', x);
        } 
    }

    set max (x) {
        if (x !== this._max){
            this._max = x;
            this._Emiter.emit('change', 'max', x);
        } 
    }
    
    set totalAsc (x) {
        if (x !== this._totalAsc){
            this._totalAsc = x;
            this._Emiter.emit('change', 'totalAsc', x);
        } 
    }

    set totalDesc (x) {
        if (x !== this._totalDesc){
            this._totalDesc = x;
            this._Emiter.emit('change', 'totalDesc', x);
        } 
    }

    toString = () =>
    {
        return `Υψόμετρο:\nΕλάχιστοι: ${this._min} Μέγιστο: ${this._max}
        \nΥψομετρική διαφορά:\nΘετική: ${this._totalAsc} Αρνητική: ${this._totalDesc}`;
    }

}

