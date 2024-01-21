import { COLLECTIONS } from '@/constants/collections';
import { firestore } from '@/firebase';
import { IDatabasePlayer } from '@/types/entities/player';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

type CustomPlayerData = Pick<IDatabasePlayer, 'username' | 'user' | 'avatar'>;

export const createPlayer = async (
	customPlayerData: CustomPlayerData,
	customId?: string
): Promise<Maybe<IDatabasePlayer>> => {
	const playerData: NoID<IDatabasePlayer> = {
		...customPlayerData,
		connected: false,
		activeQuestion: null,
		game: null,
		scores: [],
	};
    
	const docRef = customId
		? await setDoc(doc(firestore, COLLECTIONS.PLAYER,customId), playerData)
		: await addDoc(collection(firestore, COLLECTIONS.PLAYER), playerData);

    const playerId = (docRef ? docRef.id : customId)
    if (!playerId) {
        console.error('Could not create player')
        return null
    }

	return {
		...playerData,
		id: playerId,
	};
};
