import { Timestamp } from "firebase/firestore";
import { IGreeting } from "@/pages/GreetingPage";
import { ITour } from "./tour";
import { IRound } from "./rounds";


export type GameFocus = {
    game: Maybe<ID>;
    tour: Maybe<ID>;
    round: Maybe<ID>;
}
export type GameEntity = IGame | ITour | IRound
export type GameTrace = [Maybe<IGame>, Maybe<ITour>, Maybe<IRound>];

export interface IFinalScreen {
    isPresent: boolean;
    text: string;
    qrCode: string;
}

export interface IGame {
    title: string;
    image: string;
    isPremium: boolean;
    id: ID;
    gameModelID: ID;
    gameState: {
        startedAt: Maybe<Timestamp>,
        finishedAt: Maybe<Timestamp>,
        focus: { // executing round and tour
            round: Maybe<ID>;
            tour: Maybe<ID>;
        }
    }
    winner: Maybe<ID>;
    creator: ID; // user id
    players: ID[];
    playersLimit: number;
    greeting?: IGreeting;
    finalScreen: Partial<IFinalScreen>;
}

export type Category = string;
export type ProcessType = 'blitz' | 'queue' 


