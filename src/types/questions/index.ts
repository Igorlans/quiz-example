import { IConnectionsQuestion, IConnectionsQuestionAnswer } from "./connectionsQuestion";
import { IRangeQuestion, IRangeQuestionAnswer } from "./rangeQuestion";
import { IRemoveQuestion, IRemoveQuestionAnswer } from "./removeQuestion";
import { ISelectQuestion, ISelectQuestionAnswer } from "./selectQuestion";
import { ISortQuestion, ISortQuestionAnswer } from "./sortQuestion";

export type QuestionType = 'select' | 'remove' | 'sort' | 'connections' | 'range'

export interface IQuestion {
    readonly id: ID;
    readonly gameId: ID;
    readonly category?: ID;
    time: number;
    type: QuestionType;
    text: string;
    points: number; // the maximum points that player can get if he answered correctly
}

export type QuestionAnswer<Q extends IQuestion> =  
    Q extends ISelectQuestion ? ISelectQuestionAnswer
    : Q extends ISortQuestion ? ISortQuestionAnswer
    : Q extends IRemoveQuestion ? IRemoveQuestionAnswer
    : Q extends IConnectionsQuestion ? IConnectionsQuestionAnswer
    : Q extends IRangeQuestion ? IRangeQuestionAnswer
    : unknown

export type AnyQuestion = ISelectQuestion | ISortQuestion | IRangeQuestion | IConnectionsQuestion | IRemoveQuestion;