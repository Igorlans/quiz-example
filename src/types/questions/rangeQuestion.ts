import { IQuestion } from ".";

export interface IRangeQuestion extends IQuestion {
    type: 'range';    
    min: number;
    max: number;
    correctAnswer: number;
}

export type IRangeQuestionAnswer = number;