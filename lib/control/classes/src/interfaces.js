"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Γενικό Interface για τα αποτελέσματα που διαβάζει o TCX αναγνώστης.
 * <br>Είναι το πατρικό αντικείμενο που από κει και πέρα όλα τα υπόλοιπα ακολουθούν
 * @interface
 */
function iResult() {
    let result;
    let TrainingCenterDatabase;
}
/**
 * Get the color as an array of red, green, and blue values, represented as
 * decimal numbers between 0 and 1.
 *
 * @returns {Array<number>} An array containing the red, green, and blue values,
 * in that order.
 */
iResult.prototype.rgb = function () {
    throw new Error('not implemented');
};
/**
 * Class representing a color with transparency information.
 *
 * @class
 * @implements {iResult}
 */
function TransparentColor() { }
// inherits the documentation from `Color#rgb`
TransparentColor.prototype.rgb = function () {
    // ...
};
/**
 * Get the color as an array of red, green, blue, and alpha values, represented
 * as decimal numbers between 0 and 1.
 *
 * @returns {Array<number>} An array containing the red, green, blue, and alpha
 * values, in that order.
 */
TransparentColor.prototype.rgba = function () {
    // ...
};
exports.getResult = (data) => {
    return data.result;
};
exports.getActivities = (data) => {
    return data.TrainingCenterDatabase.Activities;
};
exports.getAuthor = (data) => {
    return data.TrainingCenterDatabase.Author;
};
exports.getLaps = (data) => {
    return data.Activity[0].Lap;
};
