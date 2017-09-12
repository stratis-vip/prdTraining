"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classes_1 = require("./classes");
let vm = new classes_1.Vo2maxClass();
let ath = new classes_1.Athlete();
let hr = new classes_1.HeartRate(120, 130, 123);
const database_1 = require("../models/database");
let db = new database_1.default('training');
db.getAthites((err, rows) => {
    if (err) {
        return console.log(err);
    }
    console.log(rows);
});
db.Emiter.on('error', (value) => {
    console.log(`onError = ${JSON.stringify(value, null, 2)}`);
});
db.Emiter.on('finish', (value) => {
    console.log(`onFinish = ${JSON.stringify(value, null, 2)}`);
});
