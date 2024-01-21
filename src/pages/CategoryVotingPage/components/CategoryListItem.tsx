import { usePlayersStore } from '@/shared/store/playersStore';
import { useRoundStore } from '@/shared/store/roundStore';
import { Category } from '@/types/entities/game';
import { Avatar, Button } from '@/ui';

interface CategoryListItemProps {
	category: Category;
    winnerCategory?: Maybe<ID>;
    disabled?: boolean;
    onClick?: (category: Category) => void;
    showVotes?: boolean;

}

const CategoryListItem: React.FC<CategoryListItemProps> = ({ category, disabled, onClick, showVotes, winnerCategory }) => {
	const players = usePlayersStore((state) => state.players);
	const votes = useRoundStore((state) => state.round?.voting?.votes);

	return (
		<li
			className='categories-list__item'
		>
			<Button
				className='rounded-[50%] p-4 h-full font-black md:text-xl sm:rounded-[40px]'
				onClick={() => onClick && onClick(category)}
				disabled={disabled}
				isCorrect={category === winnerCategory ? true : null}
			>
				{category}
			</Button>

			{showVotes && (
				<ul className='categories-list__votes-list'>
					{votes
						?.filter((vote) => vote.preference === category) // get only votes for current category iteration
						.map((vote, index) => {
							const player = players.find((player) => player.id === vote.voter);

							const INITIAL_GAP = 25;
							const ITERATION_GAP = 40;

							return (
								<Avatar
									key={vote.voter}
									className='categories-list__vote'
									img={player?.avatar}
									alt={'vote'}
									style={{
										bottom: `-${ITERATION_GAP * index + INITIAL_GAP}px`,
									}}
								/>
							);
						})}
				</ul>
			)}
		</li>
	);
};

export default CategoryListItem;
