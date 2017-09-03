import * as athlete from './athlete';
import {vo2maxClass} from './classes';
import * as constants from './consts';

let vm = new vo2maxClass();
var ath = new athlete.athlete();
ath.name = 'Παναγιώτης Λυπηρίδης';
vm.bicycling=23.1;
ath.vo2max=vm;
ath.vo2max.bicycling=32;

console.log(`To όνομα είναι: ${ath.name}`);
console.log(constants.MINHEIGHT);
ath.weight = constants.MINWEIGHT+1;
console.log(ath.weight);
