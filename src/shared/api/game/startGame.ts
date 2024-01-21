import { firestore } from "@/firebase";
import { useGameStore } from "@/shared/store/gameStore";
import { buildGamePath } from "@/shared/utils/buildGamePath";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";

export const startGame = async () => {
    const gameStructure = useGameStore.getState().structure;
    const gameId = useGameStore.getState().game?.id;

    if (!gameStructure || !gameId) return;

     // first tour
     const focusedTourId = gameStructure?.tours[0].value.id;
     // first round of first tour
     const focusedRoundId = gameStructure.tours[0]?.rounds[0]?.value.id;

     const updates = {
         'gameState.startedAt': serverTimestamp(),
         'gameState.focus.tour': focusedTourId,
         'gameState.focus.round': focusedRoundId,
     }

     await updateDoc(
        doc(firestore, buildGamePath([gameId])), 
        updates
    )
}