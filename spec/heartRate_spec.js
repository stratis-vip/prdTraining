"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("../lib/control/classes");
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
