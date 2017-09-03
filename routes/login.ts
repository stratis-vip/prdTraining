import * as express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('login', {title: 'Είσοδος στον βοηθό Προπονητή'});
});

export {router};