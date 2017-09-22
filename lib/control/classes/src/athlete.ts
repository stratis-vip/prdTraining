import {MINWEIGHT,MAXWEIGHT, MINHEIGHT, MAXHEIGHT, MAXVO2MAX ,MINHEARTRATE, MAXHEARTRATE} from '../../consts';
import  Vo2maxClass  from './vo2max';
import { sex } from '../../enums'
import { calculateBmi } from '../../functions';
import HeartRate from './heartRate';
import { EventEmitter } from 'events';

//var evn = require('./events');

export default class Athlete extends EventEmitter{
    private _Emiter:EventEmitter;
    private _id: number;
    private _weight: number = 75;
    private _height: number = 1.73;
    private _sex: sex = sex.SEX_UNDEFINED;
    private _name: string = 'Ανώνυμος';
    private _bday: Date;
    private _vo2max: Vo2maxClass;
    private _HR: HeartRate;
    private _email: string;
    private _pass:string;

    constructor() {
        super()
        this._vo2max= new Vo2maxClass();
        this._bday = new Date('1971-10-21');
        this._HR = new HeartRate(60,180);
        this._Emiter = new EventEmitter();
    }

    get Emiter() {
        return this._Emiter;
    }
     //pass
     get pass() {
        return this._pass;
    }

    set pass(x) {
        (this._pass !== x) ? this._pass=x : this._pass;
    } 

    
    //email
    get email() {
        return this._email;
    }

    set email(x) {
        (this._email !== x) ? this._email=x : this._email;
    } 

    //Id
    get id() {
        return this._id;
    }

    set id(x) {
        (this._id !== x) ? this._id=x : this._id;
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
            this._Emiter.emit('change', 'weight', x);
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
            this._Emiter.emit('change', 'height', x);
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
            this._Emiter.emit('change','sex', x);
        }
    };

    //NAME 
    get name() { return this._name; };
    set name(x: string) {
        if (this._name !== x && x.trim().length > 4 && x.trim() !== "") {
            this._name = x.trim();
            this._Emiter.emit('change','name', x);
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
            this._Emiter.emit('change','bday', x);
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
            this._Emiter.emit('change','vo2max', x);
        }
    };

    //HeartRate
    get HRMax () {
        return this._HR.mHR;
    }

    set HRMax(x) {
        if (this._HR.mHR !== x && x > MINHEARTRATE && x < MAXHEARTRATE)
        {
            this._HR.mHR = x;
            this._Emiter.emit('change','HRMax', x);
        }
    }
    get HRRest () {
        return this._HR.lHR;
    }

    set HRRest(x) {
        if (this._HR.lHR !== x && x > MINHEARTRATE && x < MAXHEARTRATE)
        {
            this._HR.lHR = x;
            this._Emiter.emit('change','HRRest', x);
        }
    }

    


};
