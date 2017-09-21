import * as express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login', {title: 'Σύνδεση'});
});

export {router};