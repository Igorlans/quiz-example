import { Page } from '@/ui';
import PlayerStars from '@/components/PlayerStars/PlayerStars';
import Star from '@/components/Star/Star';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import { calculateStars } from '@/helpers/calculateStars';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './StarsPage.scss';
import { usePlayersStore } from '@/shared/store/playersStore';
import { useRoundRedirect } from '@/hooks/useRoundRedirect';
import { useOnQueueQuestionStarted } from '@/hooks/events/useOnQueueQuestionStarted';
import { useOnGameFinished } from '@/hooks/events/useOnGameFinished';
import { usePathContext } from '@/hooks/usePathContext';
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { useGameStore } from '@/shared/store/gameStore';
import { PointsCalculator } from '@/shared/utils/PointsCalculator';

const FinalStarsPage = () => {
	const navigate = useNavigate();
	const players = usePlayersStore((state) => state.players);
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

	return (
		<Page className='stars-page'>
			<TitleWithTour />

			<section className='stars-page__title-section'>
				<h2 className='stars-page__title'>Результати</h2>
				<p className='stars-page__post-title'>за фінальним раундом</p>
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
									<StarsScore
										score={
											new PointsCalculator(
												players.map((player) => player.scores)
											).getAllStars(player.scores) ?? 0
										}
									/>
								}
								stars={
									new PointsCalculator(
										players.map((player) => player.scores)
									).getPointStars(
										player.scores.find(
											(score) => {
												return score.question === player.activeQuestion?.question
											}
										)
									) ?? 0
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

const StarsScore: FC<ScoreComponentProps> = ({ score }) => {
	return <Star score={score} />;
};

export default FinalStarsPage;
