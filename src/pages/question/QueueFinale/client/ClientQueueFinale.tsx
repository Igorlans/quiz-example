import { Page, Timer } from '@/ui';
import classes from './ClientQueueFinale.module.scss';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import { useRoundStore } from '@/shared/store/roundStore';
import ProcessMismatchError from '@/components/errors/ProcessMismatchError';
import { usePlayerStore } from '@/shared/store/playerStore';
import { useOnQueueQuestionFinished } from '../../../../hooks/events/useOnQueueQuestionFinished';
import { useNavigate } from 'react-router-dom';
import { buildGamePath } from '@/shared/utils/buildGamePath';
import { useGameStore } from '@/shared/store/gameStore';
import Question from '@/components/questions/Question';
import { writeAnswer } from '@/shared/api/player/writeAnswer';
import { finishQuestion } from '@/shared/api/player/finishQuestion';
import BottomLoader from '@/ui/loaders/BottomLoader';

const ClientQueueFinale = () => {
	const navigate = useNavigate();
	const round = useRoundStore((state) => state.round);
	const gameId = useGameStore((state) => state.game?.id);
	const player = usePlayerStore((state) => state.player);

	useOnQueueQuestionFinished(() => {
		if (!gameId) return;

		navigate(`/client/${buildGamePath([gameId])}/stars/final`, {
			replace: true,
		});
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
			<TitleWithTour>Фінішна пряма</TitleWithTour>

			<div className={classes['page-content']}>
				<h5 className={classes['page-content__subtitle']}>
					У цьому раунді молодець той, хто дасть відповідь найближче до
					правильної
				</h5>

				{!round.activeQuestion && <BottomLoader>Пошук питань</BottomLoader>}

				{round.activeQuestion && (
					<Timer
						className={classes['page-content__timer']}
						timer={round.timers[round.activeQuestion.id]}
						variant={'raw'}
					/>
				)}

				<div className={classes['page-content__question-container']}>
					{player?.activeQuestion?.question ? (
						<Question
							disabled={round.finished || player?.activeQuestion?.finished}
							question={player.activeQuestion.question}
							initial={player?.activeQuestion.answer}
							shuffleOptions={true}
							onAnswer={(answer) => {
								if (!player) return;
								writeAnswer(player.id, answer);
							}}
							onFinish={() => {
								if (!player) return;
								finishQuestion(player.id);
							}}
						/>
					) : null}
				</div>
			</div>
		</Page>
	);
};

export default ClientQueueFinale;
