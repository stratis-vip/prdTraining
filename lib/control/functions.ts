const secondsInHour = 3600;

function testme(){
    console.log("test");
}

function inform(value:object)
{
	console.log(JSON.stringify(value));
}

function updateAthlete(obj:object, property:string, value:any){
	console.log(JSON.stringify(obj)+`\nProperty ${property} changed: ${value}`);
}

//calculate Bmi with weghit w (in Kgr) and height h (in meters)
function calculateBmi(w:number,h:number){
	return w/(h * h);
};

export { updateAthlete, calculateBmi, inform };