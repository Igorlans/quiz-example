import { useEffect } from 'react';
import { useGameStore } from '@/shared/store/gameStore';
import { useRoundStore } from '@/shared/store/roundStore';

export const useOnPlayersReady = (onPlayersReady: () => any) => {
    const game = useGameStore(state => state.game);
    const round = useRoundStore(state => state.round);

    useEffect(() => {
        if (!game || !round) return;
       
        // when all players are ready
        if (game.playersLimit <= round?.readyPlayers.length) {
            onPlayersReady();    
        }
    }, [round])
}