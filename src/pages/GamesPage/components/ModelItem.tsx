import premiumIcon from '@/assets/images/games/premiumGame.svg';
import { Link } from 'react-router-dom';
import { IGameModel } from '@/types/entities/game/gameModel';


interface ModelItemProps {
	gameModel: IGameModel;
	allowed: boolean;
}

const ModelItem: React.FC<ModelItemProps> = ({ gameModel, allowed }) => {
	return (
		<li>
			<Link
				to={`/games/create/${gameModel.id}`}
				className={`w-fit mx-auto relative   ${!allowed ? 'pointer-events-none opacity-60' : ''}`}
			>
				<div className='relative w-[200px] mx-auto rounded-[17%] overflow-hidden flex justify-center items-center aspect-square shadow-[0px_4px_11pxrgba(0, 0, 0, 0.25)]'>
					<img
						className='w-full h-full object-cover scale-[120%]'
						src={gameModel.image}
						alt='game'
					/>

					{!allowed && (
						<div className='absolute'>
							<div className='game__disabled-icon'>
								<img
									src={premiumIcon}
									alt='premium'
								/>
							</div>
						</div>
					)}
				</div>
				<h4 className='text-center text-lg leading-[133%] text-custom_purple-700 mt-4'>{gameModel.title}</h4>
			</Link>
		</li>
	);
};

export default ModelItem;
