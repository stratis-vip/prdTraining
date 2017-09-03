import * as express from 'express';
import {check} from './check'
const router = express.Router();

/* GET home page. */
router.get('/', check,(req, res, next) => {
  res.render('index', { title: 'Βοηθός Προπονητή', logged:req.session.user });
  console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n`+JSON.stringify(req.session));
});

router.post('/', (req,res, next) => {
  req.session.user=req.body.userName;
  console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n`+JSON.stringify(req.session));
  console.log(JSON.stringify(req.body));
  res.render('index',{title: 'Βοηθός Προπονητή', logged:req.session.user });
})

export {router};