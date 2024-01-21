import { IDatabaseRound, IRound } from ".";
import { ParseDoc } from "../..";
import { ITimer } from "../../timer";

export interface IDatabaseBlitzRound extends IDatabaseRound {
    processType: 'blitz';
    timer: ITimer;
}

export type IBlitzRound = ParseDoc<IDatabaseBlitzRound>;
