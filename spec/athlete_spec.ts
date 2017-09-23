import {Athlete, 
        HeartRate, 
        MINWEIGHT,MAXWEIGHT, MINHEIGHT, MAXHEIGHT, MAXVO2MAX, MINHEARTRATE, MAXHEARTRATE,
        sex} from '../lib/control/classes'


let tAthlete = new Athlete();
describe("Check athlete object\n", () => {
    describe("Check Weight\n", () => {
        it("Check invalid weight (less or equal of 27.3 Kgr)\n", (done) => {
            tAthlete.weight = MINWEIGHT;
            expect(tAthlete.weight).not.toBe(MINWEIGHT);
            done();
        });

        it("Check invalid weight (more or equal of 635 kgr)", (done) => {
            tAthlete.weight = MAXWEIGHT;
            expect(tAthlete.weight).not.toBe(MAXWEIGHT);
            done();
        });

        it("Check valid weight ", (done) => {
            tAthlete.weight = 80.5;
            expect(tAthlete.weight).toBe(80.5);
            done();
        });
    });
    
    describe("Check Height\n", () => {
        it("Check Invalid height (less of 54.6)\n", (done) => {
            tAthlete.height = MINHEIGHT;
            expect(tAthlete.height).not.toBe(MINHEIGHT);
            done();
        });

        it("Check Invalid height (more than 2.72)\n", (done) => {
            tAthlete.height = MAXHEIGHT;
            expect(tAthlete.height).not.toBe(MAXHEIGHT);
            done();
        });

        it("Check Invalid height (more than 2.72)\n", (done) => {
            tAthlete.height = 4;
            expect(tAthlete.height).not.toBe(4);
            done();
        });

        it("Check valid height (more than 54.6cm and less than 2.72m)\n", (done) => {
            tAthlete.height=1.78;
            expect(tAthlete.height).toBe(1.78);
            done();
        });
    });

    describe("Check Others\n", () => {
        it("Check valid bmi for 91kg and 173 height = 30.405292525644022 \n", (done) => {
            tAthlete.weight=91;
            tAthlete.height=1.73;
            expect(tAthlete.bmi).toBeCloseTo(30.4052);
            done();
        });

        it("Check if sex set to Male correctly\n",(done) => {
            tAthlete.sex=sex.SEX_MALE;
            expect(tAthlete.sex).toBe(sex.SEX_MALE);
            done();
        });

        it("Check if sname can be null\n",(done) => {
            tAthlete.sname="";
            expect(tAthlete.sname).not.toBe("");
            done();
        });

        it("Check if sname can be only spaces\n",(done) => {
            tAthlete.sname = "        ";
            expect(tAthlete.sname).not.toBe("        ");
            done();
        });

        it("Check if name can be 3 characters\n",(done) => {
            tAthlete.sname = "abc";
            expect(tAthlete.sname).not.toBe("abc");
            done();
        });

        it("Check if name can be 3 characters trimed\n",(done) => {
            tAthlete.sname = "   abc   ";
            expect(tAthlete.sname).not.toBe("   abc   ");
            done();
        });
     
        it("Check if name can be set to Στρατής Χριστοδούλου\n",(done) => {
            tAthlete.sname = "Στρατής Χριστοδούλου";
            expect(tAthlete.sname).toBe("Στρατής Χριστοδούλου");
            done();
        });
    });
});



