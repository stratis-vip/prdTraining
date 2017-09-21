"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = (req, res, next) => {
    if (req.method !== "POST") {
        if (req.session.user || req.path === "/login") {
            return next();
        }
        else {
            res.redirect("/login");
        }
    }
    else {
        return next();
    }
};
