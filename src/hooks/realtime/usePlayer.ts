import { COLLECTIONS } from '@/constants/collections';
import { firestore } from '@/firebase';
import { usePlayerStore } from '@/shared/store/playerStore';
import { IDatabasePlayer } from '@/types/entities/player';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function usePlayer() {
	const playerId = usePlayerStore(state => state.player?.id)
	const [player, setPlayer] = useState<Maybe<IDatabasePlayer>>(null);

	useEffect(() => {
		if (!playerId) return;
		
		const playerRef = doc(firestore, `/${COLLECTIONS.PLAYER}/${playerId}`);

		const unsubscribe = onSnapshot(playerRef, (snapshot) => {
			const playerData = { ...snapshot.data(), id: snapshot.id } as IDatabasePlayer;

			setPlayer(playerData)
		});

        return unsubscribe;
	}, [playerId]);

	return player;
}
