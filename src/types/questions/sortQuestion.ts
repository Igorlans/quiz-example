import { IQuestion } from ".";

export type OptionValue = string;
export interface ISortQuestion extends IQuestion {
    type: 'sort';
    subjects: Subject[];
    options: OptionValue[]; // ['Кіно', 'Серіал']
}


export type Subject = {
    name: string; // Володар перснів
    expected: OptionValue; // Кіно (string that equals one of elements from ISortQuestion options array)
}

// if answeredValue === subject.expected => answer is correct
export type ISortQuestionAnswer = {
    subject: Subject;
    answeredValue: OptionValue;
}[];

