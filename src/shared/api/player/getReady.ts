import { DocumentReference, updateDoc } from "firebase/firestore";

export const getReady = async (playerRef: DocumentReference, isReady: boolean) => {
    try {
        const changes = {
            ready: isReady,
        }

        await updateDoc(playerRef, changes);
    } catch (error) {
        console.log("🚀 ~ file: getReady.ts:11 ~ getReady ~ error:", error)
    }
}