import {
	IBlitzRound,
	IDatabaseBlitzRound,
} from '@/types/entities/game/rounds/blitzRound';
import { fetchDocsByIds } from '../../api/fetchDocsByIds';
import { AnyQuestion } from '@/types/questions';
import { COLLECTIONS } from '@/constants/collections';

export const parseBlitzRound = async (
	round: IDatabaseBlitzRound
): Promise<IBlitzRound> => {
	const questions = round.questions?.length
		? await fetchDocsByIds<AnyQuestion>(round.questions, COLLECTIONS.QUESTION)
		: null;

    return {
        ...round,
        questions
    }
};
