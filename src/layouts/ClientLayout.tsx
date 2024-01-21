import { Container } from '@/ui';
import { Outlet, useParams } from 'react-router-dom';
import { usePlayer } from '@/hooks/realtime/usePlayer';
import BackgroundImages from '@/components/BackgroundImages';
import Realtime from '@/Realtime';
import { usePlayerStore } from '@/shared/store/playerStore';
import { useEffect } from 'react';
import { usePlayerInit } from '@/hooks/usePlayerInit';

const ClientLayout = () => {
  const storedPlayer = usePlayerStore((state) => state.player);
	const {playerId, isDone} = usePlayerInit();
	const playerSnapshot = usePlayer();
	const setPlayer = usePlayerStore((state) => state.setPlayer);
	const initializePlayerStore = usePlayerStore((state) => state.initialize);
	const initialized = usePlayerStore((state) => state.initialized);

	useEffect(() => {
		if (!isDone || initialized) return;

		initializePlayerStore(playerId)
	}, [playerId, isDone, initialized]);

	useEffect(() => {
		console.log('player.id: ', storedPlayer?.id);
	}, [storedPlayer?.id]);

	useEffect(() => {
		if (!playerSnapshot) return;
		
		setPlayer(playerSnapshot);
	}, [playerSnapshot]);

	return (
		<Realtime>
			<Container className='client__container'>
				<Outlet />
			</Container>

			<BackgroundImages variant={5} />
		</Realtime>
	);
};

export default ClientLayout;
