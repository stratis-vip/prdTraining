/*import athlete from './classes/athlete';
import {vo2maxClass} from './classes/vo2max';
import HeartRate from './classes/heartRate';
import Altitude from './classes/altitude';
import * as constants from './consts';
*

let vm = new vo2maxClass();
let ath = new athlete();
let hr = new HeartRate(120,130,123);*/
import {Altitude} from './classes'
let alt = new Altitude(12,345,122,567);

console.log(alt.toString());
let al =["MINWEIGHT","MAXWEIGHT", "MINHEIGHT", "MAXHEIGHT", "MAXVO2MAX", "MINHEARTRATE", "MAXHEARTRATE"
    ,"Athlete", "Vo2maxClass", "HeartRate", "Altitude", "Activity", "Records"];
al.sort().forEach(element => {
   console.log(element) 
});


