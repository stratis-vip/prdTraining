"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function check(req, res, next) {
    if (req.session.user) {
        next();
        return true;
    }
    else {
        res.redirect('/login');
    }
}
exports.check = check;
;
