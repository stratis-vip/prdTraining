let app = require('../bin/www');
import {athlete, HeartRate} from '../lib/control/classes/index';
import * as constants from '../lib/control/consts';
import {sex} from '../lib/control/enums'


let tAthlete = new athlete();
/*console.log(constants.MINWEIGHT);
console.log(app);
console.log(tAthlete);
tAthlete.weight=constants.MINWEIGHT;
console.log(tAthlete.weight);*/
describe("Check athlete object\n", function () {
    describe("", function () {
        it("Check invalid weight (less or equal of 27.3 Kgr)\n", function (done) {
            tAthlete.weight = constants.MINWEIGHT;
            expect(tAthlete.weight).not.toBe(constants.MINWEIGHT);
            done();
        });
    });
    app.closeServer();
})

describe("Check athlete object\n", ()=> {
    describe("", function () {
        it("Check invalid weight (less or equal of 27.3 Kgr)\n", function (done) {
            tAthlete.weight = constants.MINWEIGHT;
            expect(tAthlete.weight).not.toBe(constants.MINWEIGHT);
            done();
        });

        it("Check invalid weight (more or equal of 635 kgr)", function (done) {
            tAthlete.weight = constants.MAXWEIGHT;
            expect(tAthlete.weight).not.toBe(constants.MAXWEIGHT);
            done();
        });

        it("Check valid weight ", function (done) {
            tAthlete.weight = 80.5;
            expect(tAthlete.weight).toBe(80.5);
            done();
        });

        it("Check Invalid height (less of 54.6)\n", function (done) {
            tAthlete.height = constants.MINHEIGHT;
            expect(tAthlete.height).not.toBe(constants.MINHEIGHT);
            done();
        });

        it("Check Invalid height (more than 2.72)\n", function (done) {
            tAthlete.height = constants.MAXHEIGHT;
            expect(tAthlete.height).not.toBe(constants.MAXHEIGHT);
            done();
        });

        it("Check Invalid height (more than 2.72)\n", function (done) {
            tAthlete.height = 4;
            expect(tAthlete.height).not.toBe(4);
            done();
        });

        it("Check valid height (more than 54.6cm and less than 2.72m)\n", function (done) {
            tAthlete.height=1.78;
            expect(tAthlete.height).toBe(1.78);
            done();
        });

        it("Check valid bmi for 91kg and 173 height = 30.405292525644022 \n", function (done) {
            tAthlete.weight=91;
            tAthlete.height=1.73;
            expect(tAthlete.bmi).toBeCloseTo(30.4052);
            done();
        });

        it("Check if sex set to Male correctly\n",function(done){
            tAthlete.sex=sex.SEX_MALE;
            expect(tAthlete.sex).toBe(sex.SEX_MALE);
            done();
        });

        it("Check if name can be null\n",function(done){
            tAthlete.name="";
            expect(tAthlete.name).not.toBe("");
            done();
        });

        it("Check if name can be only spaces\n",function(done){
            tAthlete.name = "        ";
            expect(tAthlete.name).not.toBe("        ");
            done();
        });

        it("Check if name can be 3 characters\n",function(done){
            tAthlete.name = "abc";
            expect(tAthlete.name).not.toBe("abc");
            done();
        });

        it("Check if name can be 3 characters trimed\n",function(done){
            tAthlete.name = "   abc   ";
            expect(tAthlete.name).not.toBe("   abc   ");
            done();
        });
     
        it("Check if name can be set to Στρατής Χριστοδούλου\n",function(done){
            tAthlete.name = "Στρατής Χριστοδούλου";
            expect(tAthlete.name).toBe("Στρατής Χριστοδούλου");
            done();
        });
    });
    app.closeServer();
});

let hr = new HeartRate(100,100,100);
describe("Check HeartRate object\n",()=>{
    describe("Check correct initial values",()=>{
        it("average HR must be 100", (done) => {
            expect(hr.aHR).toBe(100);
            done();
        });
        it("maximum HR must be 100", (done) => {
            expect(hr.mHR).toBe(100);
            done();
        });
        it("lower HR must be 100", (done) => {
            expect(hr.lHR).toBe(100);
            done();
        });
    });

    describe("Check if i can change to correct values\n",()=>{
        it("average HR changes from 100 to 120", (done) => {
            hr.aHR = 120;
            expect(hr.aHR).toBe(120);
            done();
        });
        it("maximum HR changes from 100 to 120", (done) => {
            hr.mHR = 120;
            expect(hr.mHR).toBe(120);
            done();
        });
        it("lower HR changes from 100 to 120", (done) => {
            hr.lHR = 120;
            expect(hr.lHR).toBe(120);
            done();
        });
    });
    
    describe("Check if i can change to incorrect values\n",()=>{
        it("setting average HR too high", (done) => {
            hr.aHR = 220;
            expect(hr.aHR).not.toBe(220);
            done();
        });
        it("setting max HR too high", (done) => {
            hr.mHR = 220;
            expect(hr.mHR).not.toBe(220);
            done();
        });
        it("setting min HR too high", (done) => {
            hr.lHR = 220;
            expect(hr.lHR).not.toBe(220);
            done();
        });

        it("setting average HR too low", (done) => {
            hr.aHR = 20;
            expect(hr.aHR).not.toBe(20);
            done();
        });
        it("setting max HR too low", (done) => {
            hr.mHR = 20;
            expect(hr.mHR).not.toBe(20);
            done();
        });
        it("setting min HR too low", (done) => {
            hr.lHR = 20;
            expect(hr.lHR).not.toBe(20);
            done();
        });


    });    

});