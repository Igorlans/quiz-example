import { COLLECTIONS } from '@/constants/collections';
import { STORAGE } from '@/constants/storage';
import { fetchDocument } from '@/firebase/api';
import { createPlayer } from '@/shared/api/player/createPlayer';
import { useGameStore } from '@/shared/store/gameStore';
import { usePlayerStore } from '@/shared/store/playerStore';
import { useUserStore } from '@/shared/store/userStore';
import { IDatabasePlayer } from '@/types/entities/player';
import { useEffect, useState } from 'react';

/**
 *Hook tries to get id from zustand store, localStorage, get by custom id or create new player with custom id.
 * @returns Player id
 */
export function usePlayerInit() {
	const [playerId, setPlayerId] = useState<Maybe<ID>>(null);
	const [isDone, setIsDone] = useState<boolean>(false);
	const user = useUserStore((state) => state.user);
	const game = useGameStore((state) => state.game);
	const storePlayerId = usePlayerStore((state) => state.player?.id);

	useEffect(() => {
		(async () => {
			if (!game || isDone || playerId) return;

			
			const savedPlayerId = getSavedPlayerId();
			if (savedPlayerId && game.players.includes(savedPlayerId)) {
				return setPlayerId(savedPlayerId);
			}

			if (storePlayerId && game.players.includes(storePlayerId)) {
				return setPlayerId(storePlayerId);
			}
			if (user && game.id) {
				// Custom id for current game and signed in user
				const userPlayerId = `${user.id}_${game.id}`;
				// Try to get player with custom id
				const userPlayer = await getUserPlayer(userPlayerId);
				if (userPlayer) {
					return setPlayerId(userPlayer.id);
				}


				// If cant find => create new player with custom id
				const newPlayer = await createUserPlayer(userPlayerId);
				if (newPlayer) {
					return setPlayerId(newPlayer.id);
				}
			}

			setPlayerId(null);
			setIsDone(true);
		})();
	}, [game, user]);

	useEffect(() => {
        if (!playerId) return;

		setIsDone(true);
	}, [playerId]);

	const getSavedPlayerId = () => {
		const savedLocalStoragePlayerId = localStorage.getItem(STORAGE.SAVED_PLAYER) ?? null

		return savedLocalStoragePlayerId;
	};

	const getUserPlayer = async (userPlayerId: ID) => {
		const { data: userPlayer } = await fetchDocument<IDatabasePlayer>(
			`/${COLLECTIONS.PLAYER}/${userPlayerId}`
		);

		return userPlayer;
	};

	const createUserPlayer = async (userPlayerId: ID) => {
		if (!user) return null;

		const newPlayer = await createPlayer(
			{
				username: user.username,
				avatar: user.avatar,
				user: user.id,
			},
			userPlayerId
		);

		return newPlayer;
	};

	return { playerId, isDone };
}
