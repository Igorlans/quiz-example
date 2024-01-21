import { QR } from '@/ui';
import PageTitle from '@/ui/PageTitle/PageTitle';
import { useNavigate, useParams } from 'react-router-dom';
import {
	FaFacebookMessenger,
	FaViber,
	FaDiscord,
	FaTelegramPlane,
} from 'react-icons/fa';
import { useEffect } from 'react';
import { Page } from '@/ui';
import './ClientConnectingPage.scss';
import ShareSection from '../components/ShareSection/ShareSection';
import { usePlayerStore } from '@/shared/store/playerStore';
import { useGameStore } from '@/shared/store/gameStore';
import { useGreetingNavigate } from '@/hooks/useGreetingNavigate';
import { useGreetingsChecklist } from '@/pages/GreetingPage';
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { useUserStore } from '@/shared/store/userStore';

const ClientConnectingPage = () => {
	const { gameId } = useParams();
	const game = useGameStore((state) => state.game);
	const player = usePlayerStore((state) => state.player);
	const navigate = useNavigate();
	const connectAction = usePlayerStore((state) => state.connectAction);
	const { redirect, isReady } = useGreetingNavigate();
	const { clearChecklist } = useGreetingsChecklist();
	const initialized = usePlayerStore((state) => state.initialized);

	// connect to the game
	useEffect(() => {
		if (!game || !initialized || player?.connected) return;

		if (
			game.players.length >= game.playersLimit &&
			!game.players.includes(player?.id ?? '')
		) {
			navigate('/', { replace: true });
		}

		if (initialized && !player) {
			return navigate(
				`/client/${buildGamePath([game?.id ?? null])}/quick-start`
			);
		}

		if (
			initialized &&
			player &&
			game.id &&
			game.players.every((playerId) => playerId !== player.id)
		) {
			connectAction(game.id);
		}
	}, [player, game, initialized]);

	useEffect(() => {
		clearChecklist();
	}, []);

	useEffect(() => {
		isReady && redirect();
	}, [isReady]);

	return (
		<Page className='connecting-room'>
			<PageTitle title={game?.title} />

			<section className='connecting-room__qr-section'>
				<h2 className='connecting-room__post-title'>
					Відскануй QR код та додавайся до гри !
				</h2>

				<div className='connecting-room__players'>
					<div className='connecting-room__players-text'>
						Підключено гравців:
					</div>

					<div className='connecting-room__players-value'>
						{game?.players?.length} / {game?.playersLimit}
					</div>
				</div>

				<div className='connecting-room__qr'>
					<QR value={window.location.href} />
				</div>
			</section>

			<section className='connecting-room__share share'>
				<div className='share__socials'>
					<h3 className='share__socials-title'>Заділись грою з друзяками:</h3>

					<ul className='share__socials-list'>
						<li className='share__socials-item'>
							<a
								href='#'
								className='share__socials-link'
							>
								<FaDiscord size={'100%'} />
							</a>
						</li>

						<li className='share__socials-item'>
							<a
								href='#'
								className='share__socials-link'
							>
								<FaTelegramPlane size={'100%'} />
							</a>
						</li>

						<li className='share__socials-item'>
							<a
								href='#'
								className='share__socials-link'
							>
								<FaViber size={'100%'} />
							</a>
						</li>

						<li className='share__socials-item'>
							<a
								href='#'
								className='share__socials-link'
							>
								<FaFacebookMessenger size={'100%'} />
							</a>
						</li>
					</ul>
				</div>

				<ShareSection />
			</section>
		</Page>
	);
};

export default ClientConnectingPage;
