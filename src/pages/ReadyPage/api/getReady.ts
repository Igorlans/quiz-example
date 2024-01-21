import { firestore } from '@/firebase';
import { usePlayerStore } from '@/shared/store/playerStore'
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { GameFocus } from '@/types/entities/game';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'

export async function getReady(focus: GameFocus) {
    const playerId = usePlayerStore.getState().player?.id;
    if (!playerId || !focus.game || !focus.tour || !focus.round) return;
    
    const roundRef = doc(firestore, `/${buildGamePath([focus.game, focus.tour, focus.round])}`);

    await updateDoc(roundRef, {
        readyPlayers: arrayUnion(playerId)
    })
}