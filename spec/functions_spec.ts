import geoPoint from '../lib/control/classes/src/geoPoint';
import {
  calculateBmi,
  secsToTime,
  speedFromMpStoKpH,
  decimalPaceFromSpeedMpS,
  distanceFromMtoKM,
  decimalPaceToTimePace,
  TimePaceFromSpeedMpS,
  degToRads,
  radToDegrees,
  apostasi,
  Bearing,
  getNextPointCordinatesFromDistanceBearing
} from "../lib/control/functions";

describe("Check Functions library\n", () => {
  describe("Check calculateBmi\n", () => {
    it("Bmi of 1.73h and 91w is \n", done => {
      expect(calculateBmi(91, 1.73)).toBeCloseTo(30.4052);
      done();
    });
  });

  describe("Check distanceFromMtoKM\n", () => {
    it("Distance 1234,56m must 1.23456KM \n", done => {
      expect(distanceFromMtoKM(1234.56 as number)).toBe(1.23456);
      done();
    });
  });

  describe("Check speedFromMpStoKpH\n", () => {
    it("Speed of 1 meter per second must be 3.6 km per hour\n", done => {
      expect(speedFromMpStoKpH(1)).toBe(3.6);
      done();
    });
  });

  describe("Check decimalPaceFromSpeedMpS\n", () => {
    it("Speed of 2.77 (25/9) meter per second must be 6 min per km\n", done => {
      expect(decimalPaceFromSpeedMpS(25 / 9)).toBeCloseTo(6.000000000000001);
      done();
    });
  });

  describe("Check decPaceToTimePace\n", () => {
    it("Pace 6.2427 min per km must be 06:14.56 min per km\n", done => {
      expect(decimalPaceToTimePace(6.2427)).toBe("06:14.56");
      done();
    });
  });

  describe("Έλεγχος του secsToTime\n", () => {
    it("11725.12 secs πρέπει να είναι 03:15:25.12\n", done => {
      expect(secsToTime(11725.12)).toBe("03:15:25.12");
      done();
    });
    it("0 secs πρέπει να είναι 00:00:00.00\n", done => {
      expect(secsToTime(0)).toBe("00:00:00.00");
      done();
    });

    describe("Έλεγχος του TimePaceFromSpeedMpS\n", () => {
      it("Ταχύτητα 2.77 (25/9) m / s πρέπει να είναι ρυθμός 06:00.00\n", done => {
        expect(TimePaceFromSpeedMpS(25 / 9)).toBe("06:00.00");
        done();
      });
    });

    describe("Έλεγχος τριγωνομετρικών συναρτήσεων\n", () => {
      describe("Μετατροπή από μοίρες σε ακτίνια\n", () => {
        it("1 μοίρα πρέπει να είναι 0.01745329252\n", done => {
          expect(degToRads(1)).toBe(Math.PI / 180);
          done();
        });
        it("145.67 μοίρες πρέπει να είναι 2.5424211213801398\n", done => {
          expect(degToRads(145.67)).toBe(145.67 * (Math.PI / 180));
          done();
        });       
      });
      describe("Μετατροπή από ακτίνια σε μοίρες\n", () => {
        it("1 ακτίνιο πρέπει να είναι 57.29577951308232\n", done => {
          expect(radToDegrees(1)).toBe( 180/ Math.PI);
          done();
        });
        it("2.67 μοίρες πρέπει να είναι 152.9797312999298\n", done => {
          expect(radToDegrees(2.67)).toBe(2.67 * ( 180/Math.PI ));
          done();
        });       
      });
    });
    describe("Έλεγχος συναρτήσεων GPS\n", () =>{
        describe("Έλεγχος υπολλογισμού απόστασης - αζιμουθίων\n",() =>{
            let from= new geoPoint(40.7486,-73.9864)
            let to = new geoPoint(40.7486,-73.9864)
            it("Από το ίδιο σημείο στο ίδιο σημείο πρέπει να είναι 0\n", done => {                
                expect(apostasi(from,from)).toBe(0)
                done()
            })
            
            it("Από το σημείο (40.7486,-73.9864) στο (40.7486,-73) πρέπει να είναι 83093.06664071721\n", done => {                
                to.LongitudeDegrees = -73
                expect(apostasi(from,to)).toBe(83093.06664071721)
                done()
            })
        
            it(`Από το σημείο (${from.LatitudeDegrees},${from.LongitudeDegrees} στο (${to.LatitudeDegrees}, ${to.LongitudeDegrees}) πρέπει να είναι 117943.95662574768\n`, done => {                                    
                to.LatitudeDegrees = 40    
                expect(apostasi(from,to)).toBe(117943.95662574768)
                done()
            })
            
            it(`Το Αζιμούθιο προς το ίδιο σημείο πρέπει να είναι 0\n`, done => {                                       
                to = new geoPoint(40.7486,-73.9864)
                expect(Bearing(from,to)).toBe(0)
                done()
            })

            it(`Το αζιμούθιο από το σημείο (${from.LatitudeDegrees},${from.LongitudeDegrees} στο (40, -73) πρέπει να είναι 134.57004587715554\n`, done => {                                    
                to = new geoPoint(40,-73)  
                expect(Bearing(from,to)).toBe(134.57004587715554)
                done()
            })

            it(`Το αζιμούθιο από το σημείο (40, -73) στο (${from.LatitudeDegrees},${from.LongitudeDegrees}  πρέπει να είναι 315.2090371355856\n`, done => {                                    
                to = new geoPoint(40,-73)  
                expect(Bearing(to,from)).toBe(315.2090371355856)
                done()
            })

            it(`Το σημείο που είναι 100 μέτρα μακριά σε αζιμούθιο 180 μοιρών από το σημείο (40.544325, 22.233317) πρέπει να είναι (40.54342567839409, 22.233317)\n`, done => {                                    
                from = new geoPoint(40.544325, 22.233317)
                to = new geoPoint(40.54342567839409, 22.233317)
                expect(getNextPointCordinatesFromDistanceBearing(from,100,180)).toEqual(to)
                done()
            })

            
            
        })
    })

  });
});
