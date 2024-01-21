import { IQuestion } from ".";

export interface IConnectionsQuestion extends IQuestion {
    type: 'connections';

    question: {
        title: string;
        options: IConnectionsOption<'question'>[];
    }

    answer: {
        title: string;
        options: IConnectionsOption<'answer'>[];
    }
}

export type IConnectionsQuestionAnswer = LockedPair[];

export type LockedPair = {
    answer: IConnectionsOption<'answer'>;
    question: IConnectionsOption<'question'>;
}

export type SelectedOptions = {
    answerOption: Maybe<IConnectionsOption<'answer'>>;
    questionOption: Maybe<IConnectionsOption<'question'>>;
}

export type IConnectionsOptionType = 'question' | 'answer'
export interface IConnectionsOption<T extends IConnectionsOptionType> {
    type: T;
    value: string;  
    key: ID;
}

export type AnyConnectionOption = IConnectionsOption<IConnectionsOptionType>

export interface IOptions {
    answer: IConnectionsOption<'answer'>[];
    question: IConnectionsOption<'question'>[];
}