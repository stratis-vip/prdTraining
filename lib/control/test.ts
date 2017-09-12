/*import athlete from './classes/athlete';
import {vo2maxClass} from './classes/vo2max';
import HeartRate from './classes/heartRate';
import Altitude from './classes/altitude';
import * as constants from './consts';
*

let vm = new vo2maxClass();
let ath = new athlete();
let hr = new HeartRate(120,130,123);*/
import {Altitude} from './classes/index'
let alt = new Altitude(12,345,122,567);

console.log(alt.toString());
