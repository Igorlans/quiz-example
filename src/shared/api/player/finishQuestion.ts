import { firestore } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function finishQuestion(playerId: ID) {
    const playerRef = doc(firestore, `players/${playerId}`);

    await updateDoc(playerRef, {
        'activeQuestion.finished': true
    })
} 