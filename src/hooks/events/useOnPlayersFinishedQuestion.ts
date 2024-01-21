import { useRoundStore } from '@/shared/store/roundStore';
import { usePlayersStore } from '@/shared/store/playersStore';
import { useEffect } from 'react';

export const useOnPlayersFinishedQuestion = (callback: () => any) => {
    const round = useRoundStore(state => state.round);
    const players = usePlayersStore(state => state.players);

    useEffect(() => {
        if (players.every(player => player.activeQuestion?.finished) && players.length) {
            callback();
        }
    }, [players, round])
}