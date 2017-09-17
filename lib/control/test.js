"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const tcxparser_1 = require("./parsers/tcxparser");
tcxparser_1.getActivityFromFile(path.join(__dirname, 'test1.tcx'), (error, act) => {
    if (!error) {
        console.log(JSON.stringify(act, null, 2));
    }
    else {
        console.log(`ERROR FOUND: ${error}`);
    }
});
