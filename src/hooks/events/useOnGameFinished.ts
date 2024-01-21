import { useGameStore } from "@/shared/store/gameStore"
import { useEffect } from "react"

export const useOnGameFinished = (callback: () => void) => {
    const game = useGameStore(state => state.game);

    useEffect(() => {
        if (!game?.gameState.finishedAt) return;

        callback();
    }, [game])
}