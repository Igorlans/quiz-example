import { COLLECTIONS } from "@/constants/collections";
import { fetchDocument } from "@/firebase/api";
import { IDatabasePlayer, IPlayer } from "@/types/entities/player";
import { AnyQuestion } from "@/types/questions";

export async function parsePlayer(player: IDatabasePlayer, prev?: Maybe<IPlayer>): Promise<Maybe<IPlayer>> {
    // Change prev value to null if Ids doesnt match
    if (prev?.id !== player.id) {
        prev = null;
    }

    let activeQuestion: Maybe<AnyQuestion> = null;

    // If active question didn't change leave previous active question
    if (prev?.activeQuestion?.question?.id === player.activeQuestion?.question) {
        activeQuestion = prev?.activeQuestion?.question ?? null
    }
    // Else fetch question;
    else if (player.activeQuestion?.question) {
        const fetchedQuestion = await fetchDocument<AnyQuestion>(`/${COLLECTIONS.QUESTION}/${player.activeQuestion?.question}`)

        if (!fetchedQuestion) {
            console.error('Player active question not found while parsing');
            return null;
        }

        activeQuestion = fetchedQuestion.data;
    }
    
    return {
        ...player,
        activeQuestion: player.activeQuestion ? {
            ...player.activeQuestion,
            question: activeQuestion
        } : null
    };
}