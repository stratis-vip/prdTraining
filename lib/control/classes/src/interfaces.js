"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
