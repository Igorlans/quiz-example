import { Category, ProcessType } from "..";
import { AnyQuestion, QuestionType } from "@/types/questions";
import { IBlitzRound, IDatabaseBlitzRound } from "./blitzRound";
import { IDatabaseQueueRound, IQueueRound } from "./queueRound";
import { IVoting } from "./voting";
import { IGreeting } from "@/pages/GreetingPage";
import { DocRef, ParseDoc } from "../..";

export interface IDatabaseRound {
    id: ID;
    roundModelID: ID;
    questionsType: QuestionType;
    processType: ProcessType;
    category: Maybe<Category>;
    questions: Maybe<DocRef<'question'>[]>;
    position: number;
    finished: boolean;
    started: boolean;
    greeting?: IGreeting;
    toStars: boolean;
    voting: Maybe<IVoting>
    readyPlayers: ID[];
}

export type IRound = ParseDoc<IDatabaseRound>;

export type Round = IQueueRound | IBlitzRound 
export type DatabaseRound = IDatabaseQueueRound | IDatabaseBlitzRound
