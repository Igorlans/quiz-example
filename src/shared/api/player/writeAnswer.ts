import { firestore } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function writeAnswer(playerId: ID, answer: any) {
    const playerRef = doc(firestore, `players/${playerId}`);

    await updateDoc(playerRef, {
        'activeQuestion.answer': answer,
    })
} 