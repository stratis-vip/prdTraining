import * as express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  req.session.user = null
  req.session.userid= null
  res.render('login', {title: 'Σύνδεση'});
});

export {router};