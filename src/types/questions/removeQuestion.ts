import { IQuestion } from ".";

export interface RemoveOption {
    value: string;
    correct: boolean;
}

export interface IRemoveQuestion extends IQuestion {
    type: 'remove';
    options: {
        data: RemoveOption[];
    }[];
}

export type IRemoveQuestionAnswer = RemoveOption[]; // array of removed options