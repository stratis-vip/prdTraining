"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        if (req.path !== '/login')
            res.redirect('/login');
    }
};
