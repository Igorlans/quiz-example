
import { DocumentReference, updateDoc } from "firebase/firestore";

export const connect = async (playerRef: DocumentReference, gameID: ID): Promise<Maybe<ID>> => {
    try {
        const changes = {
            game: gameID
        }
    
        await updateDoc(playerRef, changes);
        
        return gameID
    } catch (error) {
        console.log("🚀 ~ file: connect.ts:18 ~ connect ~ error:", error)
        return null;
    }
}