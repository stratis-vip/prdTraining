const secondsInHour = 3600;

function testme(){
    console.log("test");
}

//calculate Bmi with weghit w (in Kgr) and height h (in meters)
function calculateBmi(w:number,h:number){
	return w/(h * h);
};

export {   calculateBmi };