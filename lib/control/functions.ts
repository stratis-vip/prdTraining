declare global {
    interface Number {
        distanceFromMtoKM() : number;
        speedFromMpStoKpH(): number;
        decimalPaceFromSpeedMpS():number;
        decPaceToTimePace():string;
        TimePaceFromSpeedMpS():string;
        secsToTime(boolean?):string;
    }
}
const secondsInHour = 3600;

//calculate Bmi with weghit w (in Kgr) and height h (in meters)
//τεστ ΟΚ
function calculateBmi(weightInKG:number,heightInMeters:number){
	return weightInKG/(heightInMeters * heightInMeters);
};

//μετατρέπει τα μέτρα σε ΚΜ
//τεστ ΟΚ
Number.prototype.distanceFromMtoKM = function(this:number) {
    if (this - Math.floor(this) === 0){
        return this / 1000;
    }else{
        let medium = Math.pow(10,this.toString().split('.')[1].length)
        return this * medium / (medium * 1000)
    }
};

//μετατρέπει την ταχύτητα από m/s σε Κm/h
//τεστ οκ
Number.prototype.speedFromMpStoKpH = function(this:number) {
    return this * 3.6;
};

//μετατρέπει την ταχύτητα από m/s σε δεκαδικό ρυθμό min/km
//test ok
Number.prototype.decimalPaceFromSpeedMpS = function(this:number) {
    return 50 / (this *3);
};

//μετατρέπει την ταχύτητα από m/s σε μορφής ΛΛ:ΔΔ.ΕΕ
//test ok
Number.prototype.TimePaceFromSpeedMpS = function(this:number) {
    let dec= this.decimalPaceFromSpeedMpS();
    
    return dec.decPaceToTimePace();
};

//μετατρέπει τον ρυθμο από την δεκαδική του μορφή στη μορφή ΛΛ:ΔΔ.ΕΕ
//τεστ οκ
Number.prototype.decPaceToTimePace = function (this:number){
    return (this * 60 ).secsToTime(false);
}

//μετατρέπει τα δευτερόλεπτα σε χρόνο της μορφής ΩΩ:ΛΛ:ΔΔ.ΕΕ
//τεστ οκ
Number.prototype.secsToTime = function (this:number,showHours?:boolean){
    (showHours === undefined) ? showHours=true : showHours=false;
    let alfa = this;
    let result="";
    //βρίσκω τις ώρες
    let hrs = Math.floor(alfa / 3600);
    if (hrs > 0){
        alfa -= hrs*3600;
        ;(hrs > 9) ? result += hrs.toString()+':' : result = `0${hrs.toString()}:`;
    } else { (showHours) ? result += `00:` : result=result  }

    //μιν -> λεπτά
    let min = Math.floor(alfa / 60);
    alfa -= min * 60;
    ;(min > 9) ? result += min.toString()+':' : result += `0${min.toString()}:`;
    
    //sec -> δευτερόλεπτα
    let secs = Math.floor(alfa);
    (secs > 9) ? result += secs.toString() : result += `0${secs.toString()}`;

    alfa -= secs;
    if (alfa === 0 ) {return `${result}.00`};

    //mil -> εκατοστά
    let mil = Math.floor(alfa *100);
    (mil > 9) ? result += `.${mil.toString()}` : result += `.0${mil.toString()}`;

    return result;
}






export {   calculateBmi  };