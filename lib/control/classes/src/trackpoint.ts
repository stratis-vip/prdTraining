export default class TrackPointClass{	
	private _Time:Date;
	private _LatitudeDegrees: number
	private _LongitudeDegrees: number
	private _AltitudeMeters: number
	constructor() { }


	public get Time(): Date {
		return this._Time;
	}

	public set Time(value: Date) {
		if (this._Time !== value) {
			this._Time = value;
		}
	}

	get LatitudeDegrees() {
		return this._LatitudeDegrees
	}
	set LatitudeDegrees(x) {
		if (this._LatitudeDegrees !== x) {
			this._LatitudeDegrees = x;
		}
	}

	get LongitudeDegrees() {
		return this._LongitudeDegrees
	}
	set LongitudeDegrees(x) {
		if (this._LongitudeDegrees !== x) {
			this._LongitudeDegrees = x;
		}
	}

	get AltitudeMeters() {
		return this._AltitudeMeters
	}
	set AltitudeMeters(x) {
		if (this._AltitudeMeters !== x) {
			this._AltitudeMeters = x;
		}
	}

}