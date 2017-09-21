import * as express from 'express';

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
  console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n`+JSON.stringify(req.session));
  console.log(JSON.stringify(req.body));
  res.render('index',{title: 'Βοηθός Προπονητή', logged:req.session.user });
})

export {router};