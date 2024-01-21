import { useRoundStore } from '@/shared/store/roundStore';
import { FC } from 'react';
import './CategoriesList.scss';
import CategoryListItem from '../CategoryListItem';
import CategoryItemSkeleton from '../CategoryItemSkeleton';
import { Category } from '@/types/entities/game';

interface CategoriesListProps {
	showVotes?: boolean;
	onPick?: (candidateId: Category) => any;
	disabled?: boolean;
	isLoading?: boolean;
}

const CategoriesList: FC<CategoriesListProps> = ({
	showVotes,
	onPick,
	disabled,
	isLoading,
}) => {
	const round = useRoundStore((state) => state.round);
	const winnerCategory = useRoundStore((state) => state.round?.category);

	return (
		<ul className='categories-list'>
			{isLoading
				? Array.from(new Array(4)).map((_, index) => (
						<CategoryItemSkeleton key={index} />
				  ))
				: round?.voting?.candidates.map((category) => (
						<CategoryListItem
							key={category}
							winnerCategory={winnerCategory}
							category={category}
							disabled={disabled}
							onClick={onPick}
							showVotes={showVotes}
						/>
				  ))}
		</ul>
	);
};

export default CategoriesList;
