"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let app = require('../bin/www');
const classes_1 = require("../lib/control/classes");
const constants = require("../lib/control/consts");
let tAthlete = new classes_1.Athlete();
describe("Check athlete object\n", () => {
    describe("Check Weight\n", () => {
        it("Check invalid weight (less or equal of 27.3 Kgr)\n", (done) => {
            tAthlete.weight = constants.MINWEIGHT;
            expect(tAthlete.weight).not.toBe(constants.MINWEIGHT);
            done();
        });
        it("Check invalid weight (more or equal of 635 kgr)", (done) => {
            tAthlete.weight = constants.MAXWEIGHT;
            expect(tAthlete.weight).not.toBe(constants.MAXWEIGHT);
            done();
        });
        it("Check valid weight ", (done) => {
            tAthlete.weight = 80.5;
            expect(tAthlete.weight).toBe(80.5);
            done();
        });
    });
    describe("Check Height\n", () => {
        it("Check Invalid height (less of 54.6)\n", (done) => {
            tAthlete.height = constants.MINHEIGHT;
            expect(tAthlete.height).not.toBe(constants.MINHEIGHT);
            done();
        });
        it("Check Invalid height (more than 2.72)\n", (done) => {
            tAthlete.height = constants.MAXHEIGHT;
            expect(tAthlete.height).not.toBe(constants.MAXHEIGHT);
            done();
        });
        it("Check Invalid height (more than 2.72)\n", (done) => {
            tAthlete.height = 4;
            expect(tAthlete.height).not.toBe(4);
            done();
        });
        it("Check valid height (more than 54.6cm and less than 2.72m)\n", (done) => {
            tAthlete.height = 1.78;
            expect(tAthlete.height).toBe(1.78);
            done();
        });
    });
    describe("Check Others\n", () => {
        it("Check valid bmi for 91kg and 173 height = 30.405292525644022 \n", (done) => {
            tAthlete.weight = 91;
            tAthlete.height = 1.73;
            expect(tAthlete.bmi).toBeCloseTo(30.4052);
            done();
        });
        it("Check if sex set to Male correctly\n", (done) => {
            tAthlete.sex = 1 /* SEX_MALE */;
            expect(tAthlete.sex).toBe(1 /* SEX_MALE */);
            done();
        });
        it("Check if name can be null\n", (done) => {
            tAthlete.name = "";
            expect(tAthlete.name).not.toBe("");
            done();
        });
        it("Check if name can be only spaces\n", (done) => {
            tAthlete.name = "        ";
            expect(tAthlete.name).not.toBe("        ");
            done();
        });
        it("Check if name can be 3 characters\n", (done) => {
            tAthlete.name = "abc";
            expect(tAthlete.name).not.toBe("abc");
            done();
        });
        it("Check if name can be 3 characters trimed\n", (done) => {
            tAthlete.name = "   abc   ";
            expect(tAthlete.name).not.toBe("   abc   ");
            done();
        });
        it("Check if name can be set to Στρατής Χριστοδούλου\n", (done) => {
            tAthlete.name = "Στρατής Χριστοδούλου";
            expect(tAthlete.name).toBe("Στρατής Χριστοδούλου");
            done();
        });
    });
    app.closeServer();
});
let hr = new classes_1.HeartRate(100, 100, 100);
describe("Check HeartRate object\n", () => {
    describe("Check correct initial values", () => {
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
    describe("Check if i can change to correct values\n", () => {
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
    describe("Check if i can change to incorrect values\n", () => {
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
