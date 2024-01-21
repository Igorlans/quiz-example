import { Timer } from '@/ui';
import { Page } from '@/ui';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import { useRoundStore } from '@/shared/store/roundStore';
import CategoriesList from '../components/CategoriesLits/CategoriesList';
import { usePlayerStore } from '@/shared/store/playerStore';
import './ClientCategoryVotingPage.scss';
import { useOnVotingFinished } from '@/hooks/events/useOnVotingFinished';
import { useIsCategoriesLoading } from '../hooks/useIsCategoriesLoading';
import { useRoundRedirect } from '@/hooks/useRoundRedirect';
import { Category } from '@/types/entities/game';
import { IDatabaseRound, IRound } from '@/types/entities/game/rounds';

const ClientCategoryVotingPage = () => {
	const vote = useRoundStore((state) => state.vote);
	const player = usePlayerStore((state) => state.player);
	const round = useRoundStore((state) => state.round);
  	const isCategoriesLoading = useIsCategoriesLoading();
	const { questionPageNavigate } = useRoundRedirect();

	useOnVotingFinished(() => {
		questionPageNavigate();
	});

	const handleVote = async (candidate: Category) => {
		if (!player) return;

		vote({
			preference: candidate,
			voter: player.id,
		});
	};

	return (
		<Page className='client-category'>
			<TitleWithTour />

			<div className='client-category__timer'>
				<Timer timer={round?.voting?.timer ?? null} isLoading={isCategoriesLoading} />
			</div>

			<section className='client-category__variants'>
				<h3 className='client-category__variants-title'>
					Вибери категорію питання
				</h3>
				<p className='client-category__about-text'>
					(за нічиєю комп’ютер обере випадкову категорію з лідерів опитування)
				</p>

				<CategoriesList
					disabled={
					round?.voting?.votes.some((vote) => vote.voter === player?.id) ||
					round?.voting?.timer.finished
					}
					onPick={handleVote}
					isLoading={isCategoriesLoading}
				/>	
			</section>
		</Page>
	);
};

export default ClientCategoryVotingPage;
