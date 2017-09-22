import * as express from 'express';
import * as app from '../app'
import DB from '../lib/models/database';
import * as crypt from 'bcrypt'

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
  let checkDb = new DB();
  checkDb.findAthlitiByMail(user, (err, isfound, ath) => {
    if (isfound) {
      crypt.compare(pass, ath[0].pass, (err, same) => {
        if (same) {
          req.session.user = user
          //res.locals.user = req.body.userName;
          console.log(`Session id ${req.sessionID}\nreq.session.user: ${req.session.user}\n` + JSON.stringify(req.session));
          console.log(JSON.stringify(req.body));
          //console.log(`${app.locals.user}`);
          res.render('index', { title: 'Βοηθός Προπονητή', logged: req.session.user });
        } else {
          res.redirect('/login')    
        }
      })

    } else {
      res.redirect('/login')
    }
  })
})

export { router };