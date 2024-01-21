import { useGameStore } from "@/shared/store/gameStore"
import { useEffect } from "react"

export const useOnGameStarted = (callback: () => void) => {
    const game = useGameStore(state => state.game);

    useEffect(() => {
        if (!game?.gameState.startedAt) return;

        callback();
    }, [game])
}