import { COLLECTIONS } from "@/constants/collections";
import { firestore } from "@/firebase"
import { IGameModel } from "@/types/entities/game/gameModel";
import { collection } from "firebase/firestore";
import { useState } from "react"
import { useCollectionOnce } from 'react-firebase-hooks/firestore'

type UseGameModelsReturn = {
    isLoading: boolean,
    models: IGameModel[]
}

export const useGameModels = (): UseGameModelsReturn => {
    const [databaseModel, isLoading] = useCollectionOnce(collection(firestore, COLLECTIONS.MODEL));
    
    return {
        models: databaseModel 
        ?   databaseModel?.docs.map((doc) => ({
                ...doc.data() as NoID<IGameModel>,
                id: doc.id
            })) 
        :   [],
        isLoading
    }
}