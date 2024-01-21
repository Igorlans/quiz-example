import { IDatabasePlayer, IPlayer } from "@/types/entities/player";
import { IQuestion, QuestionAnswer } from "@/types/questions";

//! Every question component props should implement `QuestionProps` interface
export interface QuestionProps<Q extends IQuestion> {
    question: Q;
    initial?: Maybe<QuestionAnswer<Q>>;
    onAnswer?: OnAnswerCallback<Q>;
    onFinish?: () => void;
    disabled?: boolean;
    showAnswers?: boolean;
    players?: IDatabasePlayer[];
    showTitle?: boolean;
    shuffleOptions?: boolean;
}

export type OnAnswerCallback<Q extends IQuestion> = (answer: QuestionAnswer<Q>) => void;