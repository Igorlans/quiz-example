import { IDatabaseQueueRound, IQueueRound } from "@/types/entities/game/rounds/queueRound";
import { fetchDocsByIds } from "../../api/fetchDocsByIds";
import { AnyQuestion } from "@/types/questions";
import { fetchDocument } from "../../api";
import { COLLECTIONS } from "@/constants/collections";

export const parseQueueRound = async (round: IDatabaseQueueRound): Promise<IQueueRound> => {
    const questions = round.questions?.length
        ? await fetchDocsByIds<AnyQuestion>(round.questions, COLLECTIONS.QUESTION)
        : null;
 
    const activeQuestion = round.activeQuestion
        ? await fetchDocument<AnyQuestion>(`${COLLECTIONS.QUESTION}/${round.activeQuestion}`)
        : null;

    return {
        ...round,
        activeQuestion: activeQuestion?.data ?? null,
        questions,
    }
}