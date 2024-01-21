import { Timestamp } from "firebase/firestore";

export interface ITimer {
    time: number; // seconds
    startedAt: Maybe<Timestamp>;
    finished: boolean;
}