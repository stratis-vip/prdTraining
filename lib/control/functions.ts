declare global {
    interface Number {
        distanceFromMtoKM() : number;
        speedFromMpStoKpH(): number;
        decimalPaceFromSpeedMpS():number;
        decPaceToTimePace():string;
        FromSpeedMpSToTimePace():string;
        secsToTime():string;
    }
}
const secondsInHour = 3600;

function testme(){
    console.log("test");
}

//calculate Bmi with weghit w (in Kgr) and height h (in meters)
function calculateBmi(w:number,h:number){
	return w/(h * h);
};

//μετατρέπει τα μέτρα σε ΚΜ
Number.prototype.distanceFromMtoKM = function(this:number) {
    return this / 1000;
};

//μετατρέπει την ταχύτητα 
Number.prototype.speedFromMpStoKpH = function(this:number) {
    return this * 3.6;
};

Number.prototype.decimalPaceFromSpeedMpS = function(this:number) {
    return 60 / (this *3.6);
};

Number.prototype.decPaceToTimePace = function (this:number){
    return (this * 60 ).secsToTime();
}

Number.prototype.secsToTime = function (this:number){
    let alfa = this;
    let result="";
    //βρίσκω τις ώρες
    let hrs = Math.floor(alfa / 3600);
    if (hrs > 0){
        alfa -= hrs*3600;
        ;(hrs > 9) ? result = hrs.toString()+':' : result = `0${hrs.toString()}:`;
    }

    //μιν -> λεπτά
    let min = Math.floor(alfa / 60);
    alfa -= min * 60;
    ;(min > 9) ? result += min.toString()+':' : result += `0${min.toString()}:`;
    
    //sec -> δευτερόλεπτα
    let secs = Math.floor(alfa);
    (secs > 9) ? result += secs.toString() : result += `0${secs.toString()}`;

    alfa -= secs;
    if (alfa === 0 ) {return result};

    //mil -> εκατοστά
    let mil = Math.floor(alfa *100);
    (mil > 9) ? result += `.${mil.toString()}` : result += `.0${mil.toString()}`;

    return result;
}

Number.prototype.FromSpeedMpSToTimePace = function(this:number) {
    let dec= this.decimalPaceFromSpeedMpS();
    
    return dec.decPaceToTimePace();
};

export {   calculateBmi  };