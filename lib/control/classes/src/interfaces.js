"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Συμπληρώνει το αντικείμενο iResult από το αντικείμενο που διάβασε ο αναγνώστης TCX
 * @param {iResult} data το αντικείμενο όπως το διάβασε ο αναγνώστης TCX
 * @returns iResult το αντικείμενο σε μορφή που μπορώ να το διαχειριστώ καλύτερα
 */
exports.getResult = (data) => {
    return data;
};
/**
 * Συμπληρώνει ένα πίνακα με αντικείμενα iAcitivity από το πηγαίο αντικείμενο iResult
 * @param {iResult} data το αντικείμενο που επέστρεψε ο αναγνώστης TCX
 * @returns Array<iActivity> πίνακας με τις δραστηριότητες iActivity
 */
exports.getActivities = (data) => {
    return data.result.TrainingCenterDatabase.Activities;
};
/**
 * Συμπληρώνει τη δομή iAuthor
 * @param {iResult} data το αντικείμενο που επέστρεψε ο αναγνώστης TCX
 * @returns Array<iAuthor> πίνακας με τα αντικείμενα iAuthor (μπορεί να είναι περισσότερα)
 */
exports.getAuthor = (data) => {
    return data.result.TrainingCenterDatabase.Author;
};
exports.getLaps = (data) => {
    return data.Activity[0].Lap;
};
