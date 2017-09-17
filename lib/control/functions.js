"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
