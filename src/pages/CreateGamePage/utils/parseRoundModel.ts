import { IDatabaseRound, IRound } from '@/types/entities/game/rounds';
import {
	IBlitzRoundModel,
	IQueueRoundModel,
	RoundModel,
} from '@/types/entities/game/gameModel';
import { IDatabaseBlitzRound } from '@/types/entities/game/rounds/blitzRound';
import { IDatabaseQueueRound } from '@/types/entities/game/rounds/queueRound';

type ParseReturnType<T> = Maybe<NoID<T>>;
type RoundComputableData = Pick<IRound, 'toStars' | 'position'>

export const parseRoundModel = (round: RoundModel, computableData: RoundComputableData) => {
	let result: ParseReturnType<IDatabaseRound> = null;

	switch (round.processType) {
		case 'queue': {
			result = parseQueueRoundModel(round, computableData);
			break;
		}

		case 'blitz': {
			result = parseBlitzRoundModel(round, computableData);
			break;
		}
	}

	return result;
};

function parseBlitzRoundModel(
	roundModel: IBlitzRoundModel,
	computableData: RoundComputableData
): ParseReturnType<IDatabaseBlitzRound> {
    return {
		...computableData,
        category: null,
		finished: false,
		readyPlayers: [],
		started: false,
		questions: null,
		roundModelID: roundModel.id,
		questionsType: roundModel.questionsType,
		processType: roundModel.processType,
		greeting: roundModel.greeting,
        timer:  {
            finished: false,
            startedAt: null,
            time: roundModel.time,
        },
		voting: roundModel.voting
			? {
					candidates: [],
					timer: {
						finished: false,
						startedAt: null,
						time: roundModel.voting.votingTime,
					},
					votes: [],
					finished: false
			  }
			: null,
	};
}

function parseQueueRoundModel(
	roundModel: IQueueRoundModel,
	computableData: RoundComputableData
): ParseReturnType<IDatabaseQueueRound> {
	return {
		...computableData,
        category: null,
		finished: false,
		readyPlayers: [],
		started: false,
		activeQuestion: null,
		questions: null,
		gapTime: roundModel.gapTime,
		timers: {},
		roundModelID: roundModel.id,
		questionsType: roundModel.questionsType,
		processType: roundModel.processType,
		questionsCount: roundModel.questionsCount,
		greeting: roundModel.greeting,
		voting: roundModel.voting
			? {
					candidates: [],
					timer: {
						finished: false,
						startedAt: null,
						time: roundModel.voting.votingTime,
					},
					finished: false,
					votes: [],
			  }
			: null,
	};
}
