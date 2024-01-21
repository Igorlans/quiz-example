import { useGameStore } from "@/shared/store/gameStore"
import { GameEntity, GameTrace, IGame } from "@/types/entities/game";
import { useEffect, useState } from "react";


export const useGameEntity = (id: Maybe<ID>) => {
    const gameStructure = useGameStore(state => state.structure);
    const [result, setResult] = useState<Maybe<GameEntity>>(null);
    const [segments, setSegments] = useState<GameTrace>();

    useEffect(() => {
        if (!id) return;

        if (gameStructure?.game.id === id) {
            setSegments([gameStructure.game, null, null])
            setResult(gameStructure.game)
        }

        gameStructure?.tours.forEach(tour => {
            if (tour.value.id === id) {
                setSegments([gameStructure.game, tour.value, null])
                setResult(tour.value)
            }

            tour.rounds.forEach(round => {
                if (round.value.id === id) {
                    setSegments([gameStructure.game, tour.value, round.value])
                    setResult(round.value)
                }
            })
        })
    }, [gameStructure, id])

    return {
        entity: result,
        segments,
    };
}