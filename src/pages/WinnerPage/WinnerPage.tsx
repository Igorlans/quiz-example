import { Page, PageTitle, Avatar } from '@/ui';
import Star from '@/components/Star/Star';
import { usePathContext } from '@/hooks/usePathContext';
import { useTimeout } from '@/hooks/useTimeout';
import { useNavigate } from 'react-router-dom';
import { useGameStore } from '@/shared/store/gameStore';
import { useTargetPlayer } from './hooks/useTargetPlayer';
import { usePlayersStore } from '@/shared/store/playersStore';
import './WinnerPage.scss';
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { PointsCalculator } from '@/shared/utils/PointsCalculator';

/**
 * Page is rendered with `usePathpathContext` hook that displays winner or current player result based on location pathContext (client or screen)
 * It is needed to put page twice in screen and client thread in order to make `usePathpathContext` hook work
 * */
const WinnerPage = () => {
	const game = useGameStore((state) => state.game);
	const players = usePlayersStore((state) => state.players);
	const navigate = useNavigate();
	const pathContext = usePathContext();
	const targetPlayer = useTargetPlayer();

	useTimeout(() => {
		if (game?.finalScreen.isPresent) {
			navigate(`/${buildGamePath([game?.id ?? null])}/final_screen`);
		}
	}, 5000);

	return (
		<Page className='winner-page'>
			<PageTitle title={game?.title} />

			<h1 className='winner-page__title'>
				{pathContext === 'client' ? 'Вітаємо' : 'Вітаємо переможця'}
			</h1>

			<div className='winner-page__player'>
				<Avatar
					className='winner-page__player-avatar'
					img={targetPlayer?.avatar}
					alt='winner'
				/>

				<p className='winner-page__player-username'>{targetPlayer?.username}</p>
			</div>

			<section className='winner-page__result-section'>
				<Star
					score={
						new PointsCalculator(
							players.map((player) => player.scores)
						).getAllStars(targetPlayer?.scores ?? []) ?? 0
					}
				/>

				<h2 className='winner-page__result-title'>
					{pathContext === 'client' ? 'Твій результат' : 'Результат переможця'}
				</h2>
			</section>
		</Page>
	);
};

export default WinnerPage;
