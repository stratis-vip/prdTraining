import TrackPoint from './trackpoint'

export default class Track {
	private _Time: Date
	private _Position: TrackPoint
	private _DistanceMeters: number
	private _HeartRateBpm: number
	private _Cadence: number
	private _Speed: number
	constructor() {
		this._Position = new TrackPoint()
	}

	get Time() {
		return this._Time
	}
	set Time(x) {
		if (this._Time !== x) {
			this._Time = x;
		}
	}

	get Position() {
		return this._Position
	}
	set Position(x) {
		if (this._Position !== x) {
			this._Position = x;
		}
	}

	get DistanceMeters() {
		return this._DistanceMeters
	}
	set DistanceMeters(x) {
		if (this._DistanceMeters !== x) {
			this._DistanceMeters = x;
		}
	}

	get HeartRateBpm() {
		return this._HeartRateBpm
	}
	set HeartRateBpm(x) {
		if (this._HeartRateBpm !== x) {
			this._HeartRateBpm = x;
		}
	}

	get Cadence() {
		return this._Cadence
	}
	set Cadence(x) {
		if (this._Cadence !== x) {
			this._Cadence = x;
		}
	}

	get Speed() {
		return this._Speed
	}
	set Speed(x) {
		if (this._Speed !== x) {
			this._Speed = x;
		}
	}
}