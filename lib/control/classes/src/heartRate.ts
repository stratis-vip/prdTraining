import {MINHEARTRATE, MAXHEARTRATE} from '../consts';
import { updateHeartRate } from '../functions';

export default class HeartRate{
    private _aHR : number;
    private _lHR : number;
    private _mHR : number;
    constructor (lhr?:number, mhr?:number, ahr?:number) {
        (lhr) ? this._lHR = lhr : this._lHR = 50;
        (mhr) ? this._mHR = mhr : this._mHR = 160;
        (ahr) ? this._aHR = ahr : this._aHR = 105;
    }

    get aHR () { return this._aHR;}
    get lHR () { return this._lHR;}
    get mHR () { return this._mHR;}

    set aHR (x) {
        if ((x<=MAXHEARTRATE && x>=MINHEARTRATE)){
            this._aHR = x;
            updateHeartRate(this, 'aHR', x);
        } 
    }

    set lHR (x) {
        if ((x<=MAXHEARTRATE && x>=MINHEARTRATE)){
            this._lHR = x;
            updateHeartRate(this, 'lHR', x);
        } 
    }
    
    set mHR (x) {
        if ((x<=MAXHEARTRATE && x>=MINHEARTRATE)){
            this._mHR = x;
            updateHeartRate(this, 'mHR', x);
        } 
    }

    toString = () =>
    {
        return `Καρδιακοί παλμοί:\nΕλάχιστοι: ${this._lHR} Μέγιστοι: ${this._mHR} Μέσος όρος: ${this._aHR}`;
    }

}

