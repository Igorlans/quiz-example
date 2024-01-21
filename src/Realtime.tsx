import { FC, ReactNode, useEffect } from 'react';
import { Loader } from '@/ui';
import { useParams } from 'react-router-dom';
import { useGame } from './hooks/realtime/useGame';
import { useGameStore } from './shared/store/gameStore';
import { useRoundStore } from './shared/store/roundStore';
import { useRound } from './hooks/realtime/useRound';
import { usePlayersStore } from './shared/store/playersStore';
import { usePlayers } from './hooks/realtime/usePlayers';
import { usePathContext } from './hooks/usePathContext';

interface RealtimeProps {
	children: ReactNode;
}

const Realtime: FC<RealtimeProps> = ({ children }) => {
	const { gameId } = useParams();

	// * Game Updating
	const setGame = useGameStore((state) => state.setGame);
	const { game } = useGame(gameId);

	useEffect(() => {
		if (!game) return;

		setGame(game);
	}, [game]);

	// * Round Updating
	const setRound = useRoundStore((state) => state.setRound);
	const { round } = useRound(
		gameId ?? null,
		game?.gameState.focus.tour ?? null,
		game?.gameState.focus.round ?? null
	);
	useEffect(() => {
		if (!round) return;
		setRound(round);
	}, [round]);

	// * Players updating
	const setPlayers = usePlayersStore((state) => state.updatePlayers);
	const players = usePlayers(game ? game.players : []);

	useEffect(() => {
		if (game?.players.length !== players.length) return;

		setPlayers(players);
	}, [players]);

	// * Game Structure building
	const buildStructure = useGameStore((state) => state.buildStructure);
	const structure = useGameStore((state) => state.structure);

	useEffect(() => {
		if (!structure && game) {
			buildStructure();
		}
	}, [game]);

  	// * Other
  	usePathContext();


	// * Cleanup
	const resetGame = useGameStore(state => state.reset)
	useEffect(() => {
		return () => {
			resetGame()
			setPlayers([]);
		  	setRound(null);
		}
	  }, [])

	return <>{children}</>;
};

export default Realtime;
