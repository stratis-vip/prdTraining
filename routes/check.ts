import * as express from 'express';

export const  check = (req:express.Request, res:express.Response, next:express.NextFunction)=>{
   if (req.session.user ){
        next();
    } else{ 
       if (req.path !== '/login')
        res.redirect('/login');
    }    
};

