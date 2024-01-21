import { firestore } from '@/firebase';

import { addDoc, collection } from 'firebase/firestore';
import { createRound } from './createRound';
import { createTour } from './createTour';
import { IGameModel } from '@/types/entities/game/gameModel';
import { IGame } from '@/types/entities/game';
import { parseRoundModel } from '../utils/parseRoundModel';
import { COLLECTIONS } from '@/constants/collections';

export const createGame = async (
	gameModel: IGameModel,
	creator: ID,
	limit: number
): Promise<Maybe<IGame>> => {
	const newGame: NoID<IGame> = {
		creator,
		
		gameState: {
			startedAt: null,
			finishedAt: null,
			focus: {
				round: null,
				tour: null,
			},
		},
		players: [],
		winner: null,
		playersLimit: limit,
		title: gameModel.title,
		image: gameModel.image,
		isPremium: gameModel.isPremium,
		gameModelID: gameModel.id,
		finalScreen: gameModel.finalScreen,
		greeting: gameModel.greeting,
	};

	const gamesCollection = collection(firestore, COLLECTIONS.GAME);
	const gameRef = await addDoc(gamesCollection, newGame);

	for await (let [tourIndex, tourModel] of Object.entries(gameModel.tours)) {
		const tourData = await createTour(gameRef.id, {
			position: parseInt(tourIndex) + 1,
			tourModelID: tourModel.id,
			greeting: tourModel.greeting,
		});

		for await (let [roundIndex, roundModel] of Object.entries(
			tourModel.rounds
		)) {
			const toStars = typeof gameModel.toStarsIndex === 'number' 
				? gameModel.toStarsIndex <= parseInt(tourIndex)
				: false;
                
			const processedRound = parseRoundModel(
				roundModel,
                {
                    position: parseInt(roundIndex) + 1,
                    toStars
                }
			);

			if (!processedRound) continue;
			await createRound(gameRef.id, tourData.id, processedRound);
		}
	}

	return {
		...newGame,
		id: gameRef.id,
	};
};
