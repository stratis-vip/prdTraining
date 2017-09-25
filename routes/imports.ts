import * as express from 'express';
import * as multer from  'multer'
import * as fs from 'fs'
import { getActivityFromFile } from '../lib/control/parsers/tcxparser';
import { Activity } from '../lib/control/classes/index';

const router = express.Router();

let upload = multer({ dest: 'uploads' })
//  let storage = multer.memoryStorage()
//  let upload = multer({ storage: storage })

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.render('imports', {logged: req.session.user})
});

router.post('/upload', upload.array('tcx'), (req, res, next) => {
  console.log('file '+JSON.stringify(req.files))
//  console.log('file '+req.file.buffer.toString())
  //console.log('ΒΟΔΥ = '+JSON.stringify(req.body))
  let act:Array<Activity> = null

  (req.files as Array<{}>).forEach((element, value,index) => {
    getActivityFromFile(element.path, (err,activ)=>{
      if (!err){
        act.push(activ);
      }

      fs.unlink(element.path, (err)=>{
        if (err){
          console.log(JSON.stringify(err))
        }
      })  
    }) //<--
      
  });


  
});


export {router};