
import { ICategoryVote } from "@/types/entities/game/rounds/voting";
import { arrayUnion, DocumentReference, updateDoc } from "firebase/firestore";


/**
 * Writes new vote into *votes* field of round. 
 * 
 * @param ref Firestore round reference 
 * @param vote Vote of `ICategoryVote` type
*/
export const vote = async (ref: DocumentReference, vote: ICategoryVote ): Promise<Maybe<ICategoryVote>>  => {
    try {
        await updateDoc(ref, {
            'voting.votes': arrayUnion(vote)
        })

        return vote; 
    } catch (error) {
        console.log("🚀 ~ file: vote.ts:14 ~ vote ~ error:", error)
        return null
    } 
}