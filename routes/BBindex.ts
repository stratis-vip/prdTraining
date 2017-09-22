import * as express from 'express';
import * as app from '../app'

const router = express.Router();

//τσόντα για να μη γκρινιάζει η Τypescript
interface Request{
  session: any;
  sessionID: any;

}

/* GET home page. */
router.get('/', (req:express.Request, res:express.Response, next:express.NextFunction) => {
  res.render('index', { title: 'Βοηθός Προπονητή', logged:req.session.user });
  console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n`+JSON.stringify(req.session));
});

router.post('/', (req:express.Request,res:express.Response, next:express.NextFunction) => {
  req.session.user=req.body.userName;
  //res.locals.user = req.body.userName;
  console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n`+JSON.stringify(req.session));
  console.log(JSON.stringify(req.body));
//console.log(`${app.locals.user}`);
  res.render('index',{title: 'Βοηθός Προπονητή', logged: req.session.user });
})

export {router};