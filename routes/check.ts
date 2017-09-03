function check(req:Request, res:Response, next){
    if (req.session.user){
        next();
        return true;
    } else{ 
        res.redirect('/login');
    }    
};

export {check};