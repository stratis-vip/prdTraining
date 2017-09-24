import * as express from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  console.log('in router.signin')
  res.render('signin', {title: 'Εγγραφή'});
});





export {router};
