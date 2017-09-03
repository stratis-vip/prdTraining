export enum actions {
    NO_ACTION,
    STOP_PROGRAM_ERROR,
    ACTION_REQUIRED
}

//χρειάζεται για να έχω στάνταρ τρόπο απάντησης από τα promises
export interface answer{
    reason: string;
    action: actions;
}