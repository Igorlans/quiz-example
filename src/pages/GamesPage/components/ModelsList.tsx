import { IGameModel } from '@/types/entities/game/gameModel';
import ModelItem from './ModelItem';
import SkeletonLoader from '@/ui/loaders/SkeletonLoader';
import ModelSkeleton from './ModelSkeleton';
import { SKELETONS_MODEL_COUNT } from '../constants';

interface ModelsListProps {
	models: IGameModel[];
	isLoading?: boolean;
}

const ModelsList = ({ models, isLoading }: ModelsListProps) => {
	return (
		<ul className='games__list'>
			{isLoading ? (
                Array.from(new Array(SKELETONS_MODEL_COUNT)).map((_, index) => (
                    <ModelSkeleton key={index} />
                ))
			) : (
				models.map((gameModel) => (
					<ModelItem
						key={gameModel.id}
						gameModel={gameModel}
						allowed={!gameModel.isPremium}
					/>
				))
			)}
		</ul>
	);
};

export default ModelsList;
