import PlayersList from '@/components/PlayersList/PlayersList';
import { Timer } from '@/ui';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import { Page } from '@/ui';
import { useRoundStore } from '@/shared/store/roundStore';
import CategoriesList from '../components/CategoriesLits/CategoriesList';
import { usePlayersStore } from '@/shared/store/playersStore';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useOnVotingFinished } from '@/hooks/events/useOnVotingFinished';
import './ScreenCategoryVotingPage.scss';
import { useRoundRedirect } from '@/hooks/useRoundRedirect';
import { useIsCategoriesLoading } from '../hooks/useIsCategoriesLoading';

const ScreenCategoryVotingPage = () => {
	const players = usePlayersStore((state) => state.players);
	const round = useRoundStore((state) => state.round);
	const { more: moreThenSM } = useBreakpoint({ pixels: 625 });
	const { questionPageNavigate } = useRoundRedirect();
	const isCategoriesLoading = useIsCategoriesLoading();

	useOnVotingFinished(() => {
		questionPageNavigate();
	});

	return (
		<Page className='screen-category'>
			<TitleWithTour />

			<div className='screen-category__timer-mobile'>
				<Timer
					timer={round?.voting?.timer ?? null}
					isLoading={isCategoriesLoading}
				/>
			</div>

			<section className='screen-category__info-section'>
				<div className='screen-category__tour-text'>
					<h3 className='screen-category__tour-title'>
						Гравці відповідатимуть на питання з категорії, яка набере найбілше
						голосів
					</h3>

					<p className='screen-category__tour-decription'>
						(за нічиєю комп’ютер обере випадкову категорію з лідерів опитування)
					</p>
				</div>

				<div className='screen-category__timer-desktop'>
					<Timer
						timer={round?.voting?.timer ?? null}
						isLoading={isCategoriesLoading}
					/>
				</div>
			</section>

			<section className='screen-category__variants'>
				<CategoriesList
					disabled={true}
					showVotes={moreThenSM}
					isLoading={isCategoriesLoading}
				/>
			</section>

			<PlayersList
				players={players}
				showScore={true}
			/>
		</Page>
	);
};

export default ScreenCategoryVotingPage;
