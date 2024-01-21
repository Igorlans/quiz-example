import { useRoundStore } from '@/shared/store/roundStore';
import classes from './ClientQueueVoting.module.scss';
import { usePlayerStore } from '@/shared/store/playerStore';
import ProcessMismatchError from '@/components/errors/ProcessMismatchError';
import { Page, Timer } from '@/ui';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import { useNavigate } from 'react-router-dom';
import Question from '@/components/questions/Question';
import { writeAnswer } from '@/shared/api/player/writeAnswer';
import { finishQuestion } from '@/shared/api/player/finishQuestion';
import { useOnFocusChange } from '@/hooks/events/useOnFocusChange';
import BottomLoader from '@/ui/loaders/BottomLoader';

const ClientQueueVoting = () => {
	const navigate = useNavigate();
	const round = useRoundStore((state) => state.round);
	const player = usePlayerStore((state) => state.player);

	useOnFocusChange(() => {
		navigate('../results', { replace: true });
	});

	if (round?.processType !== 'queue')
		return (
			<ProcessMismatchError
				expected='queue'
				got={round?.processType ?? null}
			/>
		);

	return (
		<Page className={classes['page']}>
			<TitleWithTour>{round.category}</TitleWithTour>

			{round.activeQuestion && (
				<Timer
					className={classes['page__timer']}
					timer={round.timers[round.activeQuestion.id]}
					variant={'raw'}
				/>
			)}

			<section className={classes['page__question-section']}>
				{player?.activeQuestion?.question ? (
					<Question
						disabled={round.finished || player?.activeQuestion?.finished}
						question={player?.activeQuestion?.question}
						initial={player?.activeQuestion.answer}
						shuffleOptions={true}
						showTitle={true}
						onAnswer={(answer) => {
							if (!player) return;

							writeAnswer(player.id, answer);
						}}
						onFinish={() => {
							if (player) finishQuestion(player.id);
						}}
					/>
				) : (
					<BottomLoader className='!bottom-0'>Пошук питань</BottomLoader>
				)}
			</section>
		</Page>
	);
};

export default ClientQueueVoting;
