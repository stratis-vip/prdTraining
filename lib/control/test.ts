import * as path from 'path';
import { getActivityFromFile } from "./parsers/tcxparser";


getActivityFromFile(path.join(__dirname,'test.tcx'), (error,act) => {
    if (!error){
        console.log(JSON.stringify(act,null,2)) }
        else{
            console.log(`ERROR FOUND: ${error}`)
        }
        
})
