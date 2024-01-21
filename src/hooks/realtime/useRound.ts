import { useEffect, useState } from 'react';
import { DatabaseRound, Round } from '@/types/entities/game/rounds';
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { useRealtimeDocument } from './useRealtimeDocument';
import { parseRound } from '@/firebase/parsers/roundParsers';

export const useRound = (
	gameId: Maybe<string>,
	tourId: Maybe<string>,
	roundId: Maybe<string>
) => {
	const path =
		gameId && tourId && roundId
			? buildGamePath([gameId, tourId, roundId])
			: null;

	const { document: databaseRound, ...rest } =
		useRealtimeDocument<DatabaseRound>(path);
	const [round, setRound] = useState<Round>();

	useEffect(() => {
		(async () => {
			if (!databaseRound) return;

			const parsedRound = await parseRound(databaseRound);
			if (!parsedRound) return;

			setRound(parsedRound);
		})();
	}, [databaseRound]);

	return { round, ...rest };
};
