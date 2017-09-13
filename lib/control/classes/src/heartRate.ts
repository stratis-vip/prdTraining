import {MINHEARTRATE, MAXHEARTRATE} from '../../consts';
import { EventEmitter } from 'events';

export default class HeartRate extends EventEmitter{
    private _aHR : number;
    private _lHR : number;
    private _mHR : number;
    private _Emiter: EventEmitter;
    constructor (lhr?:number, mhr?:number, ahr?:number) {
        super();
        this._Emiter = new EventEmitter();

        (lhr) ? this._lHR = lhr : this._lHR = 50;
        (mhr) ? this._mHR = mhr : this._mHR = 160;
        (ahr) ? this._aHR = ahr : this._aHR = 105;
    }
    get Emiter() {
        return this._Emiter;
    }

    get aHR () { return this._aHR;}
    get lHR () { return this._lHR;}
    get mHR () { return this._mHR;}

    set aHR (x) {
        if ((x<=MAXHEARTRATE && x>=MINHEARTRATE)){
            this._aHR = x;
            this._Emiter.emit('change', 'aHR', x);
        } 
    }

    set lHR (x) {
        if ((x<=MAXHEARTRATE && x>=MINHEARTRATE)){
            this._lHR = x;
            this._Emiter.emit('change', 'lHR', x);
        } 
    }
    
    set mHR (x) {
        if ((x<=MAXHEARTRATE && x>=MINHEARTRATE)){
            this._mHR = x;
            this._Emiter.emit('change', 'mHR', x);
        } 
    }

    toString = () =>
    {
        return `Καρδιακοί παλμοί:\nΕλάχιστοι: ${this._lHR} Μέγιστοι: ${this._mHR} Μέσος όρος: ${this._aHR}`;
    }

}

