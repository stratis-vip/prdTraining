import * as express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log('in router.logout')
  req.session.user = null
  res.flash('info','Αποσυνδέθηκε με επιτυχία')
  res.render('login', {title: 'Σύνδεση'});
});

export {router};