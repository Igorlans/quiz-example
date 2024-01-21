import { COLLECTIONS } from "@/constants/collections";
import { firestore } from "@/firebase";
import { buildGamePath } from "@/shared/utils/buildGamePath";
import { IDatabaseTour } from "@/types/entities/game/tour";
import { addDoc, collection } from "firebase/firestore";

export const createTour = async (gameId: ID, data: NoID<IDatabaseTour>) => {
    const toursCollection = collection(firestore, `${buildGamePath([gameId])}/${COLLECTIONS.TOUR}`);

    const tourRef = await addDoc(toursCollection, data);

    return {
        ...data,
        id: tourRef.id
    }
}