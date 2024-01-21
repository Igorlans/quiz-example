import { ITimer } from "@/types/entities/timer";
import { IDatabaseRound, IRound } from ".";
import { DocRef, ParseDoc } from "../..";


type QuestionID = ID;

export interface IDatabaseQueueRound extends IDatabaseRound {
    processType: 'queue';
    timers: Record<QuestionID, Maybe<ITimer>>
    activeQuestion: Maybe<DocRef<'question'>>;
    questionsCount: number;
    gapTime: number;
}

export type IQueueRound = ParseDoc<IDatabaseQueueRound>;