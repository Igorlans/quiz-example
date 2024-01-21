import PlayersList from '@/components/PlayersList/PlayersList';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import ProcessMismatchError from '@/components/errors/ProcessMismatchError';
import { usePlayersStore } from '@/shared/store/playersStore';
import { useRoundStore } from '@/shared/store/roundStore';
import { Page, Timer } from '@/ui';
import { useEffect } from 'react';
import ContentDisplayWindow from '../components/ContentDisplayWindow/ContentDisplayWindow';
import Question from '@/components/questions/Question';
import classes from './ScreenQueueVoting.module.scss';
import { useScreenFinishedRoundNavigate } from '@/hooks/useScreenFinishedRoundNavigate';
import { useOnFocusChange } from '@/hooks/events/useOnFocusChange';
import BottomLoader from '@/ui/loaders/BottomLoader';
import { useShowQueueAnswers } from '@/hooks/useShowQueueAnswers';

const ScreenQueueVoting = () => {
	const round = useRoundStore((state) => state.round);
	const players = usePlayersStore((state) => state.players);
	const nextNavigate = useScreenFinishedRoundNavigate();
	const { showAnswers } = useShowQueueAnswers();
 
	useOnFocusChange(() => {
		setTimeout(() => {
			nextNavigate();
		  }, 3_000)
	});

	if (round?.processType !== 'queue') {
		return (
			<ProcessMismatchError
				expected='queue'
				got={round?.processType ?? null}
			/>
		);
	}

	return (
		<Page>
			<TitleWithTour>{round?.category}</TitleWithTour>

			<div
				className={`${classes['page-content']} ${
					showAnswers ? classes['page-content_result'] : ''
				}`}
			>
				{round.activeQuestion ? (
					<>
						{showAnswers && (
							<h3 className={classes['page-content__result-title']}>
								Результати:
							</h3>
						)}

						<section className={classes['page-content__question-wrapper']}>
							<ContentDisplayWindow
								categoryName={round.category ?? null}
								questionText={round.activeQuestion?.text ?? null}
							/>

							<div className={classes['page-content__question']}>
								{round.activeQuestion && (
									<Question
									 	showAnswers={showAnswers}
										question={round.activeQuestion}
										disabled={true}
										shuffleOptions={false}
										players={players}
										showTitle={false}
									/>
								)}
							</div>

							{!showAnswers && round.activeQuestion && (
								<Timer
									className={classes['page-content__timer']}
									timer={round.timers[round.activeQuestion.id]}
								/>
							)}
						</section>

						<PlayersList
							players={players}
							showScore={false}
						/>
					</>
				) : (
					<BottomLoader>Пошук питань</BottomLoader>
				)}
			</div>
		</Page>
	);
};

export default ScreenQueueVoting;
