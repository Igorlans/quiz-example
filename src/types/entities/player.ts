import { DocRef, ParseDoc } from '.';
import { AnyQuestion, QuestionAnswer } from '../questions';

import { ITimer } from './timer';

export interface IDatabasePlayer {
	id: ID;
	connected: boolean;
	username: string;
	avatar?: string;
	scores: PlayerPoint[];
	activeQuestion: Maybe<IDatabasePlayerQuestion>; // questions subcollection id
	game: ID | null;
	user?: ID;
}

interface IDatabasePlayerQuestion {
	question: Maybe<DocRef<'question'>>;
	answer: Maybe<QuestionAnswer<AnyQuestion>>;
	finished: boolean;
	isCounted: boolean;
	toStars: boolean;
}

export type IPlayer = ParseDoc<IDatabasePlayer>

export type PointType = 'BEFORE_FINAL' | 'FINAL';
export type PlayerPoint = { question: ID; type: PointType; quantity: number };


