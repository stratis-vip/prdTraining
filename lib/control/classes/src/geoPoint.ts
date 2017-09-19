import { iGeoPoint } from "../../parsers/tcxinterfaces";

export default class geoPoint implements iGeoPoint {
    private _LatitudeDegrees: number
    private _LongitudeDegrees: number
    private _AltitudeMeters: number
    constructor(lat?: number, lon?: number, alt?: number) {
      ; (lat) ? this._LatitudeDegrees = lat : this._LatitudeDegrees = 0
        ; (lon) ? this._LongitudeDegrees = lat : this._LongitudeDegrees = 0
        ; (alt) ? this._AltitudeMeters = lat : this._AltitudeMeters = 0
    }
    get LatitudeDegrees() {
      return this._LatitudeDegrees
    }
  
    set LatitudeDegrees(x: number) {
      if (this._LatitudeDegrees !== x) {
        this._LatitudeDegrees = x
      }
    }
  
    get LongitudeDegrees() {
      return this._LongitudeDegrees
    }
  
    set LongitudeDegrees(x: number) {
      if (this._LongitudeDegrees !== x) {
        this._LongitudeDegrees = x
      }
    }
  
    get AltitudeMeters() {
      return this._AltitudeMeters
    }
  
    set AltitudeMeters(x: number) {
      if (this._AltitudeMeters !== x) {
        this._AltitudeMeters = x
      }
    }
  
  }