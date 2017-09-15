import { Athlete, Vo2maxClass, HeartRate, Altitude, Activity, Lap , dummy} from './classes';
import * as constants from './consts';
import DB from '../models/database'
import * as fs from 'fs'
import * as path from 'path'
import * as gp from 'tcxparse'
import {activitiesTypes, activitiesSubTypes} from './enums'

let d = new dummy();
/**
 * alfa
 */
let alfa:number =0
console.log(alfa.secsToTime(false))