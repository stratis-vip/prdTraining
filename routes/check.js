"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = (req, res, next) => {
    if (req.session.user || req.path === '/login') {
        next();
        return true;
    }
    else {
        res.redirect('/login');
    }
};
