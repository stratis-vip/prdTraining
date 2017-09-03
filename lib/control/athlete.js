"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("./consts");
const functions_1 = require("./functions");
//var evn = require('./events');
class athlete {
    constructor() {
        //WEIGHT
        this._weight = 75;
        //HEIGHT
        this._height = 1.73;
        //SEX 
        this._sex = 0 /* SEX_UNDEFINED */;
        //NAME 
        this._name = 'Ανώνυμος';
        //age
        this._bday = new Date('1971-10-21');
    }
    get weight() {
        return this._weight;
    }
    ;
    set weight(x) {
        //x = newWeight a = this._weight just for saving keys :)
        let a = this._weight;
        if (a !== x && x > consts_1.MINWEIGHT && x < consts_1.MAXWEIGHT) {
            this._weight = x;
            functions_1.updateAthlete(this, 'weight', x);
        }
    }
    ;
    get height() {
        return this._height;
    }
    ;
    set height(x) {
        let a = this._height;
        if (a !== x && x > consts_1.MINHEIGHT && x < consts_1.MAXHEIGHT) {
            this._height = x;
            functions_1.updateAthlete(this, 'height', x);
        }
    }
    ;
    //bmi
    get bmi() {
        return functions_1.calculateBmi(this._weight, this._height);
    }
    ;
    get sex() { return this._sex; }
    ;
    set sex(x) {
        if (this._sex !== x) {
            this._sex = x;
            functions_1.updateAthlete(this, 'sex', x);
        }
    }
    ;
    get name() { return this._name; }
    ;
    set name(x) {
        if (this._name !== x && x.trim().length > 4 && x.trim() !== "") {
            this._name = x.trim();
            functions_1.updateAthlete(this, 'name', x);
        }
    }
    ;
    get bday() {
        return this._bday;
    }
    ;
    set bday(x) {
        //x must provided in form YYYY-MM-DD
        if (this._bday !== x) {
            this._bday = new Date(x);
            functions_1.updateAthlete(this, 'bday', x);
        }
    }
    ;
    get age() {
        let nowDate = new Date();
        let _age = 0;
        if (nowDate.getMonth() > this._bday.getMonth()) {
            _age += 1;
        }
        _age += nowDate.getFullYear() - this._bday.getFullYear() - 1;
        return _age;
    }
    ;
    get vo2max() {
        return this._vo2max;
    }
    ;
    set vo2max(x) {
        if (this._vo2max !== x) {
            this._vo2max = x;
            functions_1.updateAthlete(this, 'vo2max', x);
        }
    }
    ;
}
exports.athlete = athlete;
;
