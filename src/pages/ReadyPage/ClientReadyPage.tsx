import Player from '@/components/Player/Player';
import { useOnPlayersReady } from '@/hooks/events/useOnPlayersReady';
import { Page, PageTitle, Button } from '@/ui';
import { usePlayerStore } from '@/shared/store/playerStore';
import { useGameStore } from '@/shared/store/gameStore';
import { usePlayersStore } from '@/shared/store/playersStore';
import { useRoundRedirect } from '@/hooks/useRoundRedirect';
import './ClientReadyPage.scss';
import { useRoundStore } from '@/shared/store/roundStore';
import { getReady } from './api/getReady';
import { useOnRoundStarted } from '@/hooks/events/useOnRoundStarted';

const ClientReadyPage = () => {
	const player = usePlayerStore((state) => state.player);
	const players = usePlayersStore((state) => state.players);
	const game = useGameStore((state) => state.game);
	const { startingPageNavigate } = useRoundRedirect();
	const round = useRoundStore(state => state.round);

	const onReady = async () => {
		if (!player || !game) return;

		const {round, tour} = game.gameState.focus

		await getReady({
			game: game.id,
			tour,
			round
		});
	};

	useOnRoundStarted(() => {
		startingPageNavigate();
	});

	return (
		<Page className='client-ready'>
			<section className='client-ready__title-section'>
				<PageTitle title='Очікуємо гравців' />

				<div className='client-ready__count'>
					{/* number of ready users / limit number of users */}
					{round?.readyPlayers.length}/{game?.playersLimit}
				</div>
			</section>

			<section className='client-ready__players-section'>
				<h2 className='client-ready__players-title'>Готові до гри ?</h2>

				<ul className='client-ready__players-list'>
					{players.map((player) => {
						return (
							<Player
								key={player.id}
								player={player}
								active={round?.readyPlayers.includes(player.id)}
							/>
						);
					})}
				</ul>

				<Button
					onClick={onReady}
					className='mt-[4.4rem] max-w-[180px] py-2 px-10 md:mt-10'
				>
					Готовий
				</Button>
			</section>
		</Page>
	);
};

export default ClientReadyPage;
