"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
const vo2max_1 = require("./vo2max");
const functions_1 = require("../../functions");
const heartRate_1 = require("./heartRate");
const events_1 = require("events");
//var evn = require('./events');
class Athlete extends events_1.EventEmitter {
    constructor() {
        super();
        this._weight = 0;
        this._height = 0;
        this._sex = 0 /* SEX_UNDEFINED */;
        this._fname = "Ανώνυμος";
        this._sname = "Ανώνυμος";
        this._vo2max = new vo2max_1.default();
        this._HR = new heartRate_1.default();
        // this._vo2max = new Vo2maxClass();
        this._bday = new Date("1971-10-21");
        // this._HR = new HeartRate(60, 180);
        this._Emiter = new events_1.EventEmitter();
    }
    get Emiter() {
        return this._Emiter;
    }
    //pass
    get pass() {
        return this._pass;
    }
    set pass(x) {
        this._pass !== x ? (this._pass = x) : this._pass;
    }
    //email
    get email() {
        return this._email;
    }
    set email(x) {
        this._email !== x ? (this._email = x) : this._email;
    }
    //athleteId
    get id() {
        return this._id;
    }
    set id(x) {
        this._id !== x ? (this._id = x) : this._id;
    }
    //WEIGHT
    get weight() {
        return this._weight;
    }
    set weight(x) {
        //x = newWeight a = this._weight just for saving keys :)
        let a = this._weight;
        if (a !== x && x > consts_1.MINWEIGHT && x < consts_1.MAXWEIGHT) {
            this._weight = x;
            this._Emiter.emit("change", "weight", x);
        }
    }
    //HEIGHT
    get height() {
        return this._height;
    }
    set height(x) {
        let a = this._height;
        if (a !== x && x > consts_1.MINHEIGHT && x < consts_1.MAXHEIGHT) {
            this._height = x;
            this._Emiter.emit("change", "height", x);
        }
    }
    //bmi
    get bmi() {
        return functions_1.calculateBmi(this._weight, this._height);
    }
    get sbday() {
        let d = this._bday;
        let ret = d.getFullYear().toString() + '-';
        let month = d.getMonth() + 1;
        if (month < 10) {
            ret += '0';
        }
        ret += month.toString() + '-';
        let day = d.getDate();
        if (day < 10) {
            ret += '0';
        }
        ret += day.toString();
        return ret;
    }
    get fullname() {
        return `${this._fname} ${this._sname}`;
    }
    //SEX
    get sex() {
        return this._sex;
    }
    set sex(x) {
        if (this._sex !== x) {
            this._sex = x;
            this._Emiter.emit("change", "sex", x);
        }
    }
    //sNAME
    get sname() {
        return this._sname;
    }
    set sname(x) {
        if (this._sname !== x && x.trim().length > 4 && x.trim() !== "") {
            this._sname = x.trim();
            this._Emiter.emit("change", "sname", x);
        }
    }
    //FNAME
    get fname() {
        return this._fname;
    }
    set fname(x) {
        if (this._fname !== x && x.trim().length > 4 && x.trim() !== "") {
            this._fname = x.trim();
            this._Emiter.emit("change", "fname", x);
        }
    }
    //age
    get bday() {
        return this._bday;
    }
    get object() {
        return {
            id: this._id.toString(),
            weight: this._weight,
            height: this._height,
            sex: this._sex,
            fname: this._fname,
            sname: this._sname,
            bday: this._bday.toString(),
            vo2max: this._vo2max,
            HR: this._HR.object,
            email: this._email,
            pass: this._pass
        };
    }
    set bday(x) {
        //x must provided in form YYYY-MM-DD
        if (this._bday !== x) {
            this._bday = new Date(x);
            this._Emiter.emit("change", "bday", x);
        }
    }
    get age() {
        let nowDate = new Date();
        let _age = 0;
        if (nowDate.getMonth() > this._bday.getMonth()) {
            _age += 1;
        }
        _age += nowDate.getFullYear() - this._bday.getFullYear() - 1;
        return _age;
    }
    //VO2MAX
    get vo2max() {
        return this._vo2max;
    }
    set vo2max(x) {
        if (this._vo2max !== x) {
            this._vo2max = x;
            this._Emiter.emit("change", "vo2max", x);
        }
    }
    //HeartRate
    get HRMax() {
        return this._HR.mHR;
    }
    set HRMax(x) {
        if (this._HR.mHR !== x && x > consts_1.MINHEARTRATE && x < consts_1.MAXHEARTRATE) {
            this._HR.mHR = x;
            this._Emiter.emit("change", "HRMax", x);
        }
    }
    get HRRest() {
        return this._HR.lHR;
    }
    set HRRest(x) {
        if (this._HR.lHR !== x && x > consts_1.MINHEARTRATE && x < consts_1.MAXHEARTRATE) {
            this._HR.lHR = x;
            this._Emiter.emit("change", "HRRest", x);
        }
    }
}
exports.default = Athlete;
