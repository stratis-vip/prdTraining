"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secondsInHour = 3600;
function testme() {
    console.log("test");
}
//calculate Bmi with weghit w (in Kgr) and height h (in meters)
function calculateBmi(w, h) {
    return w / (h * h);
}
exports.calculateBmi = calculateBmi;
;
