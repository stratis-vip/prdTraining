"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const secondsInHour = 3600;
function testme() {
    console.log("test");
}
function inform(value) {
    console.log(JSON.stringify(value));
}
exports.inform = inform;
function updateAthlete(obj, property, value) {
    console.log(JSON.stringify(obj) + `\nProperty ${property} changed: ${value}`);
}
exports.updateAthlete = updateAthlete;
//calculate Bmi with weghit w (in Kgr) and height h (in meters)
function calculateBmi(w, h) {
    return w / (h * h);
}
exports.calculateBmi = calculateBmi;
;
