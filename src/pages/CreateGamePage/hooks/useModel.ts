import { COLLECTIONS } from "@/constants/collections";
import { firestore } from "@/firebase";
import { IGameModel } from "@/types/entities/game/gameModel";
import { doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";


interface UseModelReturn {
    isLoading: boolean;
    model: Maybe<IGameModel>
}

export const useModel = (modelID?: ID): UseModelReturn => {
    const [modelDoc, isLoading] = useDocumentOnce(doc(firestore, `${COLLECTIONS.MODEL}/${modelID}`))

    return {
        isLoading,
        model: modelID == null || !modelDoc 
            ? null
            : {
                ...modelDoc.data() as NoID<IGameModel>,
                id: modelDoc.id
            }
    }
}