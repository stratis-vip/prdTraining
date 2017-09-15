"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("../lib/control/functions");
describe("Check Functions library\n", () => {
    describe("Check calculateBmi\n", () => {
        it("Bmi of 1.73h and 91w is \n", (done) => {
            expect(functions_1.calculateBmi(91, 1.73)).toBeCloseTo(30.4052);
            done();
        });
    });
    describe("Check distanceFromMtoKM\n", () => {
        it("Distance 1234,56m must 1.23456KM \n", (done) => {
            expect(1234.56.distanceFromMtoKM()).toBe(1.23456);
            done();
        });
    });
    describe("Check speedFromMpStoKpH\n", () => {
        it("Speed of 1 meter per second must be 3.6 km per hour\n", (done) => {
            expect(1..speedFromMpStoKpH()).toBe(3.6);
            done();
        });
    });
    describe("Check decimalPaceFromSpeedMpS\n", () => {
        it("Speed of 2.77 (25/9) meter per second must be 6 min per km\n", (done) => {
            expect((25 / 9).decimalPaceFromSpeedMpS()).toBeCloseTo(6.000000000000001);
            done();
        });
    });
    describe("Check decPaceToTimePace\n", () => {
        it("Pace 6.2427 min per km must be 06:14.56 min per km\n", (done) => {
            expect(6.2427.decPaceToTimePace()).toBe('06:14.56');
            done();
        });
    });
    describe("Έλεγχος του secsToTime\n", () => {
        it("11725.12 secs πρέπει να είναι 03:15:25.12\n", (done) => {
            expect(11725.12.secsToTime()).toBe('03:15:25.12');
            done();
        });
        it("0 secs πρέπει να είναι 00:00:00.00\n", (done) => {
            expect(0..secsToTime()).toBe('00:00:00.00');
            done();
        });
        describe("Έλεγχος του TimePaceFromSpeedMpS\n", () => {
            it("Ταχύτητα 2.77 (25/9) m / s πρέπει να είναι ρυθμός 06:00.00\n", (done) => {
                expect((25 / 9).TimePaceFromSpeedMpS()).toBe('06:00.00');
                done();
            });
        });
    });
});
