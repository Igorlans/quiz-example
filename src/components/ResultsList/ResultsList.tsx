import { Avatar } from '@/ui';
import { IDatabasePlayer } from '@/types/entities/player';
import { FC } from 'react';
import './ResultsList.scss';
import { PointsCalculator } from '@/shared/utils/PointsCalculator';

interface ResultsListProps {
	players: IDatabasePlayer[];
}

const ResultsList: FC<ResultsListProps> = ({ players }) => {
	const computePercentage = (playerScore: number): string => {
		const maxScore = Math.max(
			...players.map((player) =>
				new PointsCalculator(
					players.map((player) => player.scores)
				).getBeforeFinalPointsSum(player.scores)
			)
		);

		return (playerScore / maxScore) * 100 + '%';
	};

	return (
		<ul className='results-list'>
			{players
				.slice()
				.sort(
					(player1, player2) =>
						new PointsCalculator(
							players.map((player) => player.scores)
						).getBeforeFinalPointsSum(player2.scores) -
						new PointsCalculator(
							players.map((player) => player.scores)
						).getBeforeFinalPointsSum(player1.scores)
				)
				.map((player) => (
					<li
						className='flex flex-col items-center justify-end h-full max-h-[250px] relative md:h-auto md:flex-row'
						key={player.id}
					>
						<div
							className='results-list__item-measure'
							style={{
								height: `${computePercentage(
									new PointsCalculator(
										players.map((player) => player.scores)
									).getBeforeFinalPointsSum(player.scores)
								)}`,
							}}
						>
							<div className='results-list__item-score'>
								{Math.round(
									new PointsCalculator(
										players.map((player) => player.scores)
									).getBeforeFinalPointsSum(player.scores)
								)}
							</div>
							<div className='results-list__item-column'></div>
						</div>

						<Avatar
							img={player.avatar}
							className='results-list__player-avatar'
						/>

						<p className='text-custom_purple-700 font-semibold mt-1 md:hidden'>{player.username}</p>
						<p className='hidden md:block font-semibold text-custom_purple-700 absolute -bottom-5 left-0 whitespace-nowrap'>{player.username}</p>


						<div className='results-list__item-measure_horizontal'>
							<p>
								{Math.round(
									new PointsCalculator(
										players.map((player) => player.scores)
									).getBeforeFinalPointsSum(player.scores)
								)}
							</p>
						</div>
					</li>
				))}
		</ul>
	);
};

export default ResultsList;
