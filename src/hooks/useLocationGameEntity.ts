import { useParams } from "react-router-dom"
import { useGameEntity } from "./useGameEntity";

export const useLocationGameEntity = () => {
    const { gameId, tourId, roundId } = useParams();
    // get first found entity from highest to lowest
    const { entity } = useGameEntity(roundId || tourId || gameId || null);

    return entity;
}