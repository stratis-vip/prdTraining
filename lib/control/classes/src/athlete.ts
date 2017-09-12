import {MINWEIGHT,MAXWEIGHT, MINHEIGHT, MAXHEIGHT, MAXVO2MAX} from '../../consts';
import  Vo2maxClass  from './vo2max';
import { sex } from '../../enums'
import { updateAthlete, calculateBmi } from '../../functions';
//var evn = require('./events');

export default class Athlete {
   
    private _weight: number = 75;
    private _height: number = 1.73;
    private _sex: sex = sex.SEX_UNDEFINED;
    private _name: string = 'Ανώνυμος';
    private _bday: Date;
    private _vo2max: Vo2maxClass;

    constructor() {
        this._vo2max= new Vo2maxClass();
        this._bday = new Date('1971-10-21');
    }
    
    //WEIGHT   
    get weight() {
        return this._weight;
    };
    set weight(x: number) {
        //x = newWeight a = this._weight just for saving keys :)
        let a: number = this._weight;
        if (a !== x && x > MINWEIGHT && x < MAXWEIGHT) {
            this._weight = x;
            updateAthlete(this, 'weight', x);
        }
    };

    //HEIGHT  
    get height() {
        return this._height;
    };
    set height(x: number) {
        let a: number = this._height;
        if (a !== x && x > MINHEIGHT && x < MAXHEIGHT) {
            this._height = x;
            updateAthlete(this, 'height', x);
        }
    };

    //bmi
    get bmi() {
        return calculateBmi(this._weight, this._height);
    };

    //SEX 
    get sex() { return this._sex; };
    set sex(x: sex) {
        if (this._sex !== x) {
            this._sex = x;
            updateAthlete(this,'sex', x);
        }
    };

    //NAME 
    get name() { return this._name; };
    set name(x: string) {
        if (this._name !== x && x.trim().length > 4 && x.trim() !== "") {
            this._name = x.trim();
            updateAthlete(this,'name', x);
        }
    };

    //age
    get bday() {
        return this._bday;
    };
    set bday(x: Date) {
        //x must provided in form YYYY-MM-DD
        if (this._bday !== x) {
            this._bday = new Date(x);
            updateAthlete(this,'bday', x);
        }
    };
    get age() {
        let nowDate = new Date();
        let _age: number = 0;
        if (nowDate.getMonth() > this._bday.getMonth()) {
            _age += 1;
        }
        _age += nowDate.getFullYear() - this._bday.getFullYear() - 1;
        return _age;
    };

    //VO2MAX
    get vo2max() {
        return this._vo2max;
    };
    set vo2max(x: Vo2maxClass) {
        if (this._vo2max !== x) {
            this._vo2max = x;
            updateAthlete(this,'vo2max', x);
        }
    };
};
