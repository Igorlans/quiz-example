import { COLLECTIONS } from "@/constants/collections";
import { firestore } from "@/firebase";
import { buildGamePath } from "@/shared/utils/buildGamePath";
import { IDatabaseRound } from "@/types/entities/game/rounds";

import { addDoc, collection } from "firebase/firestore";

export const createRound = async (gameId: ID, tourId: ID, data: NoID<IDatabaseRound>) => {
    const roundsCollection = collection(firestore, `${buildGamePath([gameId, tourId])}/${COLLECTIONS.ROUND}`);

    const roundRef = await addDoc(roundsCollection, data);

    return {
        ...data,
        id: roundRef.id
    }
}