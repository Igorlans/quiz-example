import { Page } from '@/ui';
import PlayerStars from '@/components/PlayerStars/PlayerStars';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import { calculateStars } from '@/helpers/calculateStars';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './StarsPage.scss';
import { usePlayersStore } from '@/shared/store/playersStore';
import { useRoundRedirect } from '@/hooks/useRoundRedirect';
import { useOnQueueQuestionStarted } from '@/hooks/events/useOnQueueQuestionStarted';
import { useOnGameFinished } from '@/hooks/events/useOnGameFinished';
import { usePathContext } from '@/hooks/usePathContext';
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { useGameStore } from '@/shared/store/gameStore';
import { PointsCalculator } from '@/shared/utils/PointsCalculator';

const TotalStarsPage = () => {
	const navigate = useNavigate();
	const players = usePlayersStore((state) => state.players);
	const { pathname } = useLocation();
	const { questionPageNavigate } = useRoundRedirect();
	const pathContext = usePathContext();
	const gameId = useGameStore((state) => state.game?.id);

	useOnQueueQuestionStarted(() => {
		questionPageNavigate();
	});

	useOnGameFinished(() => {
		setTimeout(() => {
			navigate(`/${pathContext}/${buildGamePath([gameId ?? null])}/winner`);
		}, 5000);
	});

	const isTotalPage = () => pathname.includes('/total');

	return (
		<Page className='stars-page'>
			<TitleWithTour />

			<section className='stars-page__title-section'>
				{isTotalPage() ? (
					<h2 className='stars-page__title'>Фінішна пряма</h2>
				) : (
					<>
						<h2 className='stars-page__title'>Результати</h2>
						<p className='stars-page__post-title'>за фінальним раундом</p>
					</>
				)}
			</section>

			<section className='stars-page__body'>
				<ul className='stars-page__players'>
					{players.map((player, index) => (
						<li
							className='stars-page__player-item'
							key={index}
						>
							<PlayerStars
								score={
									<PointsScore
										score={new PointsCalculator(
											players.map((player) => player.scores)
										).getPointsSum(player.scores)}
									/>
								}
								stars={
									new PointsCalculator(
										players.map((player) => player.scores)
									).getAllStars(player.scores) ?? 0
								}
								username={player.username}
								avatar={player.avatar}
							/>
						</li>
					))}
				</ul>
			</section>
		</Page>
	);
};

interface ScoreComponentProps {
	score: number;
}

const PointsScore: FC<ScoreComponentProps> = ({ score }) => {
	return <div className='stars-page__points-score'>{Math.round(score)}</div>;
};

export default TotalStarsPage;
