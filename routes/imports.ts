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
  //  console.log('file '+req.file.buffer.toString())
  //console.log('ΒΟΔΥ = '+JSON.stringify(req.body))
  let act = new Array<Activity>();
  
  (req.files as Array<Express.Multer.File>).forEach((element, index) => {
    getActivityFromFile(element.path, (err,activ)=>{
      if (!err){        
        act.push(activ);   
      //   req.body.form.on('progress', function(bytesReceived, bytesExpected) {
      //     console.log(((bytesReceived / bytesExpected)*100) + "% uploaded");
      // });    
        if (Number(index) === ((req.files as Array<Express.Multer.File>).length -1)){
          res.render('imports', {logged: req.session.user, activity:act}) 
        }
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