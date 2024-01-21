import { PlayerPoint } from '@/types/entities/player';

export class PointsCalculator {
	private _playersPoints: PlayerPoint[][];

	constructor(playersPoints: PlayerPoint[][]) {
		this._playersPoints = playersPoints;
	}

	getAllStars(points: PlayerPoint[]) {
		const beforeFinalStars = this.calculateStars(
			this._playersPoints.map((playerPoints) => {
				return this.getBeforeFinalPointsSum(playerPoints);
			}),
			this.getBeforeFinalPointsSum(points)
		);

		if (typeof beforeFinalStars !== 'number') {
			console.error('beforeFinalStars is Null')
			return null
		}

		const finalQuestionsStars = (
			points
				.filter((point) => point.type === 'FINAL')
				.map((finalPoint) => {
					return this.getPointStars(finalPoint);
				})
				.filter((stars) => stars) as number[]
		).reduce((acc, current) => acc + current, 0);

		return finalQuestionsStars + beforeFinalStars;
	}

	getPointStars(point?: Maybe<PlayerPoint>) {
		// console.log(point)
		const playersQuestionPoint = this._playersPoints
			.map((points) => {
				return points.find(
					(playerPoint) => playerPoint.question === point?.question
				);
			})
			.filter((point) => point) as PlayerPoint[];
		
		// console.log(playersQuestionPoint)
		if (!playersQuestionPoint || !point) {
			console.log('stops');
			return null;
		};

		return this.calculateStars(
			playersQuestionPoint.map((point) => point.quantity),
			point.quantity
		);
	}

	getBeforeFinalPointsSum(points: PlayerPoint[]) {
		return this.getPointsSum(
			points.filter((point) => point.type === 'BEFORE_FINAL')
		);
	}

	getPointsSum(points: PlayerPoint[]): number {
		return points.reduce((acc, current) => {
			return acc + current.quantity;
		}, 0);
	}

	protected calculateStars(
		playersScores: number[],
		score: number
	): Maybe<number> {
		// * First variant implementation
		// const sortedScores = playersScores.sort((a, b) => a - b);
		// return sortedScores.lastIndexOf(score) + 1;

		// * Current variant implementation
		const uniqueSortedScores = Array.from(
			new Set(playersScores.sort((a, b) => b - a))
		);

		if (!uniqueSortedScores.includes(score)) {
			console.error('Invalid score');
			return null;
		}

		const indexOfPlayerScore = uniqueSortedScores.indexOf(score);

		if (indexOfPlayerScore === 0) {
			return 3;
		} else if (indexOfPlayerScore === 1) {
			return 2;
		} else {
			return 1;
		}
	}
}

