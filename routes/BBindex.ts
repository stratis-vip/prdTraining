import * as express from 'express';
import * as app from '../app'
import DB from '../lib/models/database';
import * as crypt from 'bcrypt'
import { Athlete } from "../lib/control/classes/index";

const router = express.Router();

//τσόντα για να μη γκρινιάζει η Τypescript
interface Request {
  session: any;
  sessionID: any;

}

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Βοηθός Προπονητή', logged: req.session.user });
  console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
});

router.post('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let user = req.body.userName
  let pass = req.body.password
  if (user.trim() === "" || pass.trim() === "")
  {
    res.flash('error',`Τα στοιχεία είναι υποχρεωτικά!`)
    return res.redirect('/login')
  }
  let checkDb = new DB();
  checkDb.findAthlitiByMail(user, (err, isfound, ath) => {    
    if (isfound) {
      crypt.compare(pass, ath[0].pass, (err, same) => {
        if (same) {
          req.session.user = user
          res.render('index', {title: 'Βοηθός Προπονητή', logged: (ath[0] as Athlete).fullname});
          
        } else {
          res.flash('error','Δεν μπορούν να πιστοποιηθούν τα στοιχεία!')
          res.redirect('/login')    
        }
      })

    } else {
      res.flash('error',`Δεν υπάρχει Μέλος καταχωρημένο στο ${user}`)
      res.redirect('/login')
    }
  })
})

export { router };