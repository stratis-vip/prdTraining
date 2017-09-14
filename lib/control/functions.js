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
//μετατρέπει τα μέτρα σε ΚΜ
Number.prototype.distanceFromMtoKM = function () {
    return this / 1000;
};
//μετατρέπει την ταχύτητα 
Number.prototype.speedFromMpStoKpH = function () {
    return this * 3.6;
};
Number.prototype.decimalPaceFromSpeedMpS = function () {
    return 60 / (this * 3.6);
};
Number.prototype.decPaceToTimePace = function () {
    return (this * 60).secsToTime();
};
Number.prototype.secsToTime = function () {
    let alfa = this;
    let result = "";
    //βρίσκω τις ώρες
    let hrs = Math.floor(alfa / 3600);
    if (hrs > 0) {
        alfa -= hrs * 3600;
        ;
        (hrs > 9) ? result = hrs.toString() + ':' : result = `0${hrs.toString()}:`;
    }
    //μιν -> λεπτά
    let min = Math.floor(alfa / 60);
    alfa -= min * 60;
    ;
    (min > 9) ? result += min.toString() + ':' : result += `0${min.toString()}:`;
    //sec -> δευτερόλεπτα
    let secs = Math.floor(alfa);
    (secs > 9) ? result += secs.toString() : result += `0${secs.toString()}`;
    alfa -= secs;
    if (alfa === 0) {
        return result;
    }
    ;
    //mil -> εκατοστά
    let mil = Math.floor(alfa * 100);
    (mil > 9) ? result += `.${mil.toString()}` : result += `.0${mil.toString()}`;
    return result;
};
Number.prototype.FromSpeedMpSToTimePace = function () {
    let dec = this.decimalPaceFromSpeedMpS();
    return dec.decPaceToTimePace();
};
