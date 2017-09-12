"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions;
(function (actions) {
    actions[actions["NO_ACTION"] = 0] = "NO_ACTION";
    actions[actions["STOP_PROGRAM_ERROR"] = 1] = "STOP_PROGRAM_ERROR";
    actions[actions["ACTION_REQUIRED"] = 2] = "ACTION_REQUIRED";
})(actions = exports.actions || (exports.actions = {}));
class answer {
    constructor(reason, action) {
        this.reason = reason;
        this.action = action;
        this.errId = answer.getNumber();
    }
    static getNumber() {
        return ++answer.errid;
    }
}
answer.errid = 0;
exports.answer = answer;
