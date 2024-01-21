import { QuestionType } from "@/types/questions";
import { IFinalScreen, ProcessType } from ".";
import { IGreeting } from "@/pages/GreetingPage";

export interface IGameModel {
    id: ID;
    image: string;
    title: string;
    isPremium: boolean;
    tours: Record<number, ITourModel>;
    greeting?: IGreeting;
    toStarsIndex: Maybe<number>;
    finalScreen: Partial<IFinalScreen>
} 

export interface ITourModel {
    id: ID;
    rounds:  Record<number, RoundModel>
    greeting?: IGreeting;
    title: string;
}

export type RoundModel = IBlitzRoundModel | IQueueRoundModel;

interface IRoundModel {
    id: ID;
    processType: ProcessType;
    questionsType: QuestionType;
    greeting?: IGreeting;
    voting: Maybe<IVotingModel>;
    categories: string[]; // Array of round categories
}

export interface IVotingModel {
    votingTime: number
}

export interface IBlitzRoundModel extends IRoundModel {
    processType: 'blitz'
    time: number;
}

export interface IQueueRoundModel extends IRoundModel {
    processType: 'queue'
    gapTime: number;
    questionsCount: number;
}

