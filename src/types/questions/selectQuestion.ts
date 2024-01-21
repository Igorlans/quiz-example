import { IQuestion } from ".";



export interface ISelectQuestion extends IQuestion {
    type: 'select';
    options: SelectOption[];
}

export type SelectOption = {
    value: string;
    correct: boolean;
}

export type ISelectQuestionAnswer = SelectOption;