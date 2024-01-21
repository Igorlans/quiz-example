import { useRoundStore } from "@/shared/store/roundStore"
import { buildGamePath } from "@/shared/utils/buildGamePath";
import { useNavigate } from "react-router-dom";
import { usePathContext } from "./usePathContext";
import { useGameStore } from "@/shared/store/gameStore";

export const useRoundRedirect = () => {
    const round = useRoundStore((state) => state.round);
    const navigate = useNavigate();
    const pathContext = usePathContext();
    const game = useGameStore(state => state.game);

    const startingPageNavigate = () => {
        if (!game || !round) return;
        const { tour: tourId, round: roundId } = game.gameState.focus
        const gamePath = buildGamePath([game.id, tourId, roundId]);

        
        if (!round.toStars && round.voting && round.processType === 'queue') {
            navigate(`/${pathContext}/${gamePath}/category_voting`)
        } 

        if (round.toStars && !round.voting && round.processType === 'queue') {
            navigate(`/${pathContext}/${buildGamePath([game.id])}/stars/total`)
        }

        if (!round.toStars && !round.voting && round.processType === 'blitz') {
            navigate(`/${pathContext}/${gamePath}/blitz_default`)
        }
    }

    const questionPageNavigate = () => {
        if (!game || !round) return;
        const { tour: tourId, round: roundId } = game.gameState.focus
        const gamePath = buildGamePath([game.id, tourId, roundId]);

        if (!round.toStars && round.voting && round.processType === 'queue') {
            navigate(`/${pathContext}/${gamePath}/queue_voting`)
        } 

        if (round.toStars && !round.voting && round.processType === 'queue') {
            navigate(`/${pathContext}/${gamePath}/queue_finale`)
        }

        if (!round.toStars && !round.voting && round.processType === 'blitz') {
            navigate(`/${pathContext}/${gamePath}/blitz_default`)
        }
    }

    return {
        startingPageNavigate,
        questionPageNavigate
    }
}