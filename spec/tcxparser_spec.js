"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../lib/control/classes/index");
const tcxparser_1 = require("../lib/control/parsers/tcxparser");
const path = require("path");
let act = index_1.Activity;
describe("Έλεγχος του Αναγνώστη TCX\n", () => {
    let act;
    beforeEach(done => {
        tcxparser_1.getActivityFromFile(path.join(__dirname, "test1.tcx"), (err, activ) => {
            if (err) {
                act = undefined;
            }
            else {
                act = activ;
            }
            done();
        });
    });
    it("Αν δεν υπάρχει το αρχείο να επιστρέφει undefined\n", done => {
        expect(act).toBe(undefined);
        done();
    });
});
describe("Έλεγχος του Αναγνώστη TCX\n", () => {
    let act;
    beforeEach(done => {
        tcxparser_1.getActivityFromFile(path.join(__dirname, "test.tcx"), (err, activ) => {
            if (err) {
                act = undefined;
            }
            else {
                act = activ;
            }
            done();
        });
    });
    it("Το όνομα της δραστηριότητας πρέπει να είναι 2017-09-13T05:41:20.000Z\n", done => {
        expect(act.name).toBe('2017-09-13T05:41:20.000Z');
        done();
    });
    it("Ο τύπος της δραστηριότητας πρέπει να είναι 2 (ποδήλατο)\n", done => {
        expect(act.typeOfActivity).toBe(2);
        done();
    });
    it("Ο αριθμός των γύρων πρέπει να είναι 7)\n", done => {
        expect(act.laps.length).toBe(7);
        done();
    });
    it("Η μέση ταχύτητα στον 6ο γύρο πρέπει να είναι 7.0960001945495605\n", done => {
        expect(act.laps[5].AvgSpeed).toBe(7.0960001945495605);
        done();
    });
    it("Το δεύτερο σημείο στον 7ο γύρο πρέπει να έχει Longitude 22.210083296522498\n", done => {
        expect(act.laps[6].Track[1].Position.LongitudeDegrees).toBe(22.210083296522498);
        done();
    });
    it("O Ρυθμός πεταλιάς στον 7ο γύρο πρέπει να είναι 56\n", done => {
        expect(act.laps[6].Cadence).toBe(56);
        done();
    });
    it("H μέση ταχύτητα στον 7ο γύρο πρέπει να είναι 5.6570000648498535\n", done => {
        expect(act.laps[6].AvgSpeed).toBe(5.6570000648498535);
        done();
    });
    it("Ο 7ος γύρος πρέπει να έχει 2 σημεία \n", done => {
        expect(act.laps[6].Track.length).toBe(2);
        done();
    });
    it("Στον 1ο σημείο του 7ου γύρου η απόσταση πρέπει να είναι 30011.609375 \n", done => {
        expect(act.laps[6].Track[0].DistanceMeters).toBe(30011.609375);
        done();
    });
    it("Στον 1ο σημείο του 7ου γύρου ο καρδιακός παλμός πρέπει να είναι 143\n", done => {
        expect(act.laps[6].Track[0].HeartRateBpm).toBe(143);
        done();
    });
    it("Στον 1ο σημείο του 7ου γύρου ο ρυθμός πεταλιάς πρέπει να είναι 56\n", done => {
        expect(act.laps[6].Track[0].RunCadence).toBe(56);
        done();
    });
    it("Στον 1ο σημείο του 7ου γύρου η ταχύτητα πρέπει να είναι 5.019999980926515\n", done => {
        expect(act.laps[6].Track[0].Speed).toBe(5.019999980926515);
        done();
    });
    //   "_DistanceMeters": 30011.609375,
    //   "_HeartRateBpm": 143,
    //   "_Cadence": 56,
    //   "_Speed": 5.019999980926515      
});
