import * as express from "express";

export const check = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.method !== "POST" ) {
    if (req.session.user || req.path === "/login" || req.path === "/signin") {
      return next();
    } else {      
      res.redirect("/login");
    }
  } else {
      return next();
  }
};
