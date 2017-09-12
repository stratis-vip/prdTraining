export enum actions {
    NO_ACTION,
    STOP_PROGRAM_ERROR,
    ACTION_REQUIRED
}


//χρειάζεται για να έχω στάνταρ τρόπο απάντησης από τα promises
interface IAnswer{
    reason: string;
    action: actions;
    errId:number;
}

export class answer implements IAnswer{
    static errid = 0;
    reason: string;
    action: actions;
    errId: number; 
    constructor(reason:string,action:actions)
    {
        this.reason = reason;
        this.action = action;
        this.errId= answer.getNumber();
    }

    static getNumber(){
        return ++answer.errid;
    }
}


