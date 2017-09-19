"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./classes/index");
const secondsInHour = 3600;
/** Υπολογίζει το Bmi από το βάρος και το ύψος
 * @param {number} weightInKG το βάρος σε Κgr
 * @param {number} heightInMeters το υψος σε μέτρα
 * @returns number το ΒΜΙ σαν δεδκαδικό αριθμό
 */
//τεστ ΟΚ
const calculateBmi = (weightInKG, heightInMeters) => {
    return weightInKG / (heightInMeters * heightInMeters);
};
exports.calculateBmi = calculateBmi;
/**
 * Mετατρέπει την ταχύτητα από m/s σε δεκαδικό ρυθμό min/km
 * @param {number} value η ταχύτητα σε m/s
 * @returns string το ρυθμό σε λεπτά το χιλιόμετρο με τη μορφή Λ,Δ
 * @example decimalPaceFromSpeedMpS(2.77) = 6 (06:00.00)
 */
const decimalPaceFromSpeedMpS = (value) => {
    return 50 / (value * 3);
};
exports.decimalPaceFromSpeedMpS = decimalPaceFromSpeedMpS;
/**
 * Mετατρέπει τον ρυθμο από την δεκαδική του μορφή στη μορφή ΛΛ:ΔΔ.ΕΕ
 * @param  {number} value
 * @returns string: ο ρυθμός σε μορφή ΛΛ:ΔΔ.ΕΕ
 */
const decimalPaceToTimePace = (value) => {
    return secsToTime(value * 60, false);
};
exports.decimalPaceToTimePace = decimalPaceToTimePace;
/**
 * Μετατρέπει τα μέτρα σε χιλιόμετρα χωρίς να χάσει το δεικαδικό
 * @param {number} value η απόσταση σε μέτρα
 * @returns {number} την απόσταση σε ΚΜ
 */
const distanceFromMtoKM = (value) => {
    if (value - Math.floor(value) === 0) {
        return value / 1000;
    }
    else {
        let medium = Math.pow(10, value.toString().split('.')[1].length);
        return value * medium / (medium * 1000);
    }
};
exports.distanceFromMtoKM = distanceFromMtoKM;
/**
 * Mετατρέπει την ταχύτητα από m/s σε Κm/h
 * @param {number} value η ταχύτητα σε m/s
 * @returns number η ταχύτητα σε ΧαΩ
 */
const speedFromMpStoKpH = (value) => {
    return value * 3.6;
};
exports.speedFromMpStoKpH = speedFromMpStoKpH;
/**
 * Mετατρέπει την ταχύτητα από m/s σε ρυθμό της μορφής ΛΛ:ΔΔ.ΕΕ
 * @param  {number} value η ταχύτητα σε m/s
 * @returns string ο ρυθμός σε μορφή ΛΛ:ΔΔ.ΕΕ
 */
const TimePaceFromSpeedMpS = (value) => {
    return decimalPaceToTimePace(decimalPaceFromSpeedMpS(value));
};
exports.TimePaceFromSpeedMpS = TimePaceFromSpeedMpS;
/**
 * H secsToTime μετατρέπει τα δευτερόλεπτα value σε χρόνο της μορφής
 * [ΩΩ:]ΛΛ:ΔΔ.ΕΕ.
 *
 * <p>Οι ώρες δεν εμφανίζονται αν τεθεί η τιμή showHours σε false (εξ ορισμού
 * εμφανίζονται οι ώρες)</p>
 * @param {number} value ο χρόνος σε secs
 * @param {boolean} showHours αν θα εμφανίζεται το πεδίο ΩΩ:
 * @returns string o χρόνος σε μορφή ΩΩ:ΛΛ:ΔΔ.ΕΕ
 *
 */
//τεστ οκ
const secsToTime = (value, showHours) => {
    (showHours === undefined) ? showHours = true : showHours = false;
    let result = "";
    //βρίσκω τις ώρες
    let hrs = Math.floor(value / 3600);
    if (hrs > 0) {
        value -= hrs * 3600;
        ;
        (hrs > 9) ? result += hrs.toString() + ':' : result = `0${hrs.toString()}:`;
    }
    else {
        (showHours) ? result += `00:` : result = result;
    }
    //μιν -> λεπτά
    let min = Math.floor(value / 60);
    value -= min * 60;
    ;
    (min > 9) ? result += min.toString() + ':' : result += `0${min.toString()}:`;
    //sec -> δευτερόλεπτα
    let secs = Math.floor(value);
    (secs > 9) ? result += secs.toString() : result += `0${secs.toString()}`;
    value -= secs;
    if (value === 0) {
        return `${result}.00`;
    }
    ;
    //mil -> εκατοστά
    let mil = Math.floor(value * 100);
    (mil > 9) ? result += `.${mil.toString()}` : result += `.0${mil.toString()}`;
    return result;
};
exports.secsToTime = secsToTime;
/**
 * Μετατρέπει τις Μοίρες σε Ακτίνια
 *
 * @param {number} Degrees οι μοίρες
 * @returns number τις degrees μοίρες σε ακτίνια
 */
//test ok
const degToRads = (Degrees) => {
    return Degrees * ((Math.PI) / 180);
};
exports.degToRads = degToRads;
/**
* Μετατρέπει τα ακτίνια σε μοίρες
*
* @param {number} η γωνία angle σε ακτίνια
* @returns number τα ακτίνια angle σε μοίρες
*/
//test ok
const radToDegrees = (angle) => {
    return angle * (180 / Math.PI);
};
exports.radToDegrees = radToDegrees;
/**
 * Υπολογίζει την απόσταση σε ΜΕΤΡΑ από το σημείο FromPoint στο σημείο ToPoint
 *
 * @param {geoPoint} FromPoint οι συντεταγμένες του αρχικού σημείου σε ΜΟΙΡΕΣ
 * @param {geoPoint} ToPoint οι συντεταγμένες του τελικού σημείου σε ΜΟΙΡΕΣ
 * @returns number η απόσταση ανάμεσα στα σημεία σε ΜΕΤΡΑ
*/
//test οκ
const apostasi = (FromPoint, ToPoint) => {
    let lat2 = ToPoint.LatitudeDegrees;
    let lon2 = ToPoint.LongitudeDegrees;
    let lat1 = FromPoint.LatitudeDegrees;
    let lon1 = FromPoint.LongitudeDegrees;
    let φ1 = degToRads(lat1);
    let φ2 = degToRads(lat2);
    let λ1 = degToRads(lon1);
    let λ2 = degToRads(lon2);
    let Δλ = degToRads(lon2 - lon1);
    let Δφ = degToRads(lat2 - lat1);
    let R = 6371e3;
    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};
exports.apostasi = apostasi;
/**
 * Υπολογίζει το αζιμούθιο σε ΜΟΙΡΕΣ
 *
 * @param {geoPoint} FromPoint οι συντεταγμένες του αρχικού σημείου σε ΜΟΙΡΕΣ
 * @param {geoPoint} ToPoint οι συντεταγμένες του τελικού σημείου σε ΜΟΙΡΕΣ
 * @returns number το αζιμούθιο από το αρχικό ως το τελικό σημείο
 */
//test ok
const Bearing = (FromPoint, ToPoint) => {
    let lat2 = ToPoint.LatitudeDegrees;
    let lon2 = ToPoint.LongitudeDegrees;
    let lat1 = FromPoint.LatitudeDegrees;
    let lon1 = FromPoint.LongitudeDegrees;
    let φ1 = degToRads(lat1);
    let φ2 = degToRads(lat2);
    let λ1 = degToRads(lon1);
    let λ2 = degToRads(lon2);
    let Δλ = degToRads(lon2 - lon1);
    let Δφ = degToRads(lat2 - lat1);
    let y = Math.sin(λ2 - λ1) * Math.cos(φ2);
    let x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(λ2 - λ1);
    let temp = radToDegrees(Math.atan2(y, x));
    if (temp < 0) {
        temp = temp + 360;
    }
    return temp;
};
exports.Bearing = Bearing;
/**
 * Υπολογίζει τις συντεταγμένες του σημείου που βρίσκεται σε δεδομένα απόσταση και αζιμούθιο από το σημείο που στεκόμαστε
 *
 * @param {geoPoint} FromPoint το αρχικό σημείο
 * @param {number} distance η απόσταση σε μέτρα προς το επόμενο σημείο
 * @param {number} Bearing το αζιμούθιο προς το τελικό σημείο σε ΜΟΙΡΕΣ
 * @returns geoPoint αντικείμενο Cordinates
 */
//test ok
const getNextPointCordinatesFromDistanceBearing = (FromPoint, distance, Bearing) => {
    let brng = degToRads(Bearing);
    let lat1 = FromPoint.LatitudeDegrees;
    let lon1 = FromPoint.LongitudeDegrees;
    let d = distance;
    let R = 6371e3;
    let φ1 = degToRads(lat1);
    let λ1 = degToRads(lon1);
    let temp = new index_1.geoPoint();
    temp.LatitudeDegrees = Math.asin(Math.sin(φ1) * Math.cos(d / R) + Math.cos(φ1) * Math.sin(d / R) * Math.cos(brng));
    let φ2 = temp.LatitudeDegrees;
    temp.LongitudeDegrees = λ1 + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(φ1), Math.cos(d / R) - Math.sin(φ1) * Math.sin(φ2));
    temp.LatitudeDegrees = radToDegrees(temp.LatitudeDegrees);
    temp.LongitudeDegrees = radToDegrees(temp.LongitudeDegrees);
    temp.AltitudeMeters = FromPoint.AltitudeMeters;
    return temp;
};
exports.getNextPointCordinatesFromDistanceBearing = getNextPointCordinatesFromDistanceBearing;
