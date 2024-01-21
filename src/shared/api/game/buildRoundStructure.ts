import { firestore } from "@/firebase";

import { collection, getDocs } from "firebase/firestore";
import { GameStructure } from "../../store/gameStore";
import { ITour } from "@/types/entities/game/tour";
import { IRound, Round } from "@/types/entities/game/rounds";
import { fetchDocument } from "@/firebase/api";
import { IGame } from "@/types/entities/game";
import { buildGamePath } from "@/shared/utils/buildGamePath";
import { COLLECTIONS } from "@/constants/collections";

export const buildRoundStrucrture = async (gameID: ID): Promise<Maybe<GameStructure>> => {
    try {
        let tours = [];

        const game = await fetchDocument<IGame>(buildGamePath([gameID]))
        if (!game.data) return null;

        const toursSnapshot = await getDocs(collection(firestore, `${buildGamePath([gameID])}/${COLLECTIONS.TOUR}`));
    
        const toursData = toursSnapshot.docs
            .map(doc => ({...doc.data(), id: doc.id} as ITour))
            .sort((a, b) => a.position - b.position)
    
        for await (const tour of toursData) {
            const rounds: IRound[] = [];
            const roundsSnapshot = await getDocs(collection(firestore, `${buildGamePath([gameID, tour.id])}/${COLLECTIONS.ROUND}`));
    
            for await (const roundDoc of roundsSnapshot.docs) {
                const roundData = roundDoc.data() as NoID<IRound>;
    
                rounds.push({ ...roundData, id: roundDoc.id });
            }
    
            tours.push({
                value: tour,
                rounds: rounds
                    .sort((a, b) => a.position - b.position)
                    .map((round) => ({value: round}))
            })
        }

        return {
            game: game.data,
            tours
        };
    } catch (error) {
        console.log("🚀 ~ file: buildRoundStructure.ts:36 ~ buildRoundStrucrture ~ error:", error)
        return null;
    }
}