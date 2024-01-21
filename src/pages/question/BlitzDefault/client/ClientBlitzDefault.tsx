import { Page, Timer } from '@/ui';
import classes from './ClientBlitzDefault.module.scss';
import { useRoundStore } from '@/shared/store/roundStore';
import ProcessMismatchError from '@/components/errors/ProcessMismatchError';
import { QuestionTypesTranslation } from '@/shared/translations/questionTypes';
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour';
import { usePlayerStore } from '@/shared/store/playerStore';
import { useNavigate } from 'react-router-dom';
import Question from '@/components/questions/Question';
import { useOnFocusChange } from '@/hooks/events/useOnFocusChange';
import { writeAnswer } from '@/shared/api/player/writeAnswer';
import { finishQuestion } from '@/shared/api/player/finishQuestion';
import BottomLoader from '@/ui/loaders/BottomLoader';

const ClientBlitzDefault = () => {
	const navigate = useNavigate();
	const round = useRoundStore((state) => state.round);
	const player = usePlayerStore((state) => state.player);

	useOnFocusChange(() => {
		navigate('../results', { replace: true });
	});

	if (round?.processType !== 'blitz')
		return (
			<ProcessMismatchError
				expected='blitz'
				got={round?.processType ?? null}
			/>
		);

	return (
		<Page className={classes['page']}>
			<TitleWithTour>
				{QuestionTypesTranslation[round.questionsType]}
			</TitleWithTour>

			<div className={classes['page-content']}>
				<h5>
					У вас є одна хвилина, аби дати якомога більше правильних відповідей
				</h5>

				{!player?.activeQuestion?.question && (
					<BottomLoader>Пошук питань</BottomLoader>
				)}

				<Timer
					className={classes['page-content__timer']}
					timer={round.timer}
					variant={'raw'}
				/>

				<div className={classes['page-content__question-container']}>
					{player?.activeQuestion?.question ? (
						<Question
							disabled={round.finished}
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
					) : null}
				</div>
			</div>
		</Page>
	);
};

export default ClientBlitzDefault;
