import { Timestamp } from 'firebase/firestore';
import { AnyQuestion } from '../questions';
import { IGame } from './game';
import { Round } from './game/rounds';
import { ITour } from './game/tour';
import { IPlayer } from './player';
import { ITimer } from './timer';

type DocName = 'game' | 'tour' | 'round' | 'player' | 'question';

type ReplaceReference<T> = T extends DocRef<'game'>
	? IGame
	: T extends DocRef<'tour'>
	? ITour
	: T extends DocRef<'round'>
	? Round
	: T extends DocRef<'player'>
	? IPlayer
	: T extends DocRef<'question'>
	? AnyQuestion
	: T;

export type ParseDoc<T> = T extends DocRef<infer R>
	? ReplaceReference<T>
	: T extends ITimer 
	? ITimer
	: T extends object
	? { [K in keyof T]: ParseDoc<T[K]> }
	: T;

// Adding /__ X __/ to make type unique form just a string
export type DocRef<T extends DocName> = `/__${T}__/`;
