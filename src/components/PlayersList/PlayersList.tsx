import Player from '../Player/Player';
import { IDatabasePlayer } from '@/types/entities/player';
import './PlayersList.scss';
import { PointsCalculator } from '@/shared/utils/PointsCalculator';

interface PlayersListProps {
	showScore?: boolean;
	players: IDatabasePlayer[];
}

const PlayersList: React.FC<PlayersListProps> = ({
	showScore = false,
	players,
}) => {
	return (
		<section className='players-section'>
			<ul className='players-section__list'>
				{players.map((player) => (
					<Player
						key={player.id}
						player={player}
						active={true}
						score={
							showScore
								? new PointsCalculator(
										players.map((player) => player.scores)
								  ).getBeforeFinalPointsSum(player.scores)
								: null
						}
					/>
				))}
			</ul>
		</section>
	);
};

export default PlayersList;
