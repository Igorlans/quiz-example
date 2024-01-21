import { IDatabasePlayer, IPlayer } from '@/types/entities/player';
import {
	documentId,
	where,
} from 'firebase/firestore';
import { COLLECTIONS } from '@/constants/collections';
import { useRealtimeCollection } from './useRealtimeCollection';
import { useEffect } from 'react';

export const usePlayers = (playersIds: ID[]) => {
	const { documents: players, subscribe } = useRealtimeCollection<IDatabasePlayer>(COLLECTIONS.PLAYER);

	useEffect(() => {
		if (!playersIds.length) return;

		const unsubscribe = subscribe(where(documentId(), 'in', playersIds))
		return unsubscribe 
	}, [playersIds])

	return players;
};
