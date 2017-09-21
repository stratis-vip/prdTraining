import * as express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log('in router.login')
  res.render('login', {title: 'Σύνδεση'});
});

export {router};