import * as express from 'express';

export const  check = (req:express.Request, res:express.Response, next:express.NextFunction)=>{
   if (req.session.user || req.path === '/login'){
        next();
        return true;
    } else{ 
        res.redirect('/login');
    }    
};

