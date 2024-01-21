import {
	IRangeQuestion,
} from '@/types/questions/rangeQuestion';
import { useEffect, useState } from 'react';

import { useBreakpoint } from '@/hooks/useBreakpoint';
import './RangeQuestion.scss';
import { QuestionProps } from '../types';
import FullAnswerLine from './components/FullAnswerLine/FullAnswerLine';
import AnswerLine from './components/AnswerLine/AnswerLine';
import CorrectAnswerLine from './components/CorrectAnswerLine/CorrectAnswerLine';
import AnswerForm, { RangeQuestionFormData } from './components/AnswerForm/AnswerForm';

interface RangeQuestionProps extends QuestionProps<IRangeQuestion> {}


const RangeQuestion: React.FC<RangeQuestionProps> = ({
	initial,
	question,
	disabled,
	onAnswer,
	onFinish,
	players,
	showAnswers,
	showTitle = true,
	shuffleOptions,
}) => {
	const [answer, setAnswer] = useState<Maybe<number>>(null);
	const { less } = useBreakpoint({
		pixels: 768,
		measureBy: 'width',
	});


	useEffect(() => {
		setAnswer(initial ?? null)
	}, [question.id])

	const onSubmit = (data: RangeQuestionFormData) => {
        if (
            Number.isNaN(data.answer) ||
            data.answer > question.max ||
            data.answer < question.min
        )
            return;

		setAnswer(data.answer)
		onAnswer?.(data.answer);
		onFinish?.();
    }

	const computePosition = (value: number) => {
		const rangeLength = question.max - question.min;
		const toValueLength = value - question.min;

		return (toValueLength / rangeLength) * 100;
	};

	return (
		<section className='range-question'>
            {showTitle && <h3 className='range-question__title'>{question.text}</h3>}
			

			<div className='range-question__body'>
				<div className='range-question__content'>
					<div className='range-question__edge range-question__edge-min'>
						<p className='range-question__edge-value'>{question.min}</p>
					</div>

					<div className='range-question__content-range'></div>

					{typeof answer === 'number' && (
						<AnswerLine less={less} percentage={computePosition(answer)} value={answer} />
					)}

					{showAnswers && ( 
                        players?.map((player) => {
                            if (typeof player.activeQuestion?.answer !== 'number') return;

                            return (
                                <FullAnswerLine
                                    key={player?.id}
                                    answer={player.activeQuestion?.answer}
                                    gap={computePosition(player.activeQuestion?.answer)}
                                    avatar={player?.avatar}
                                    less={less}
                                />
                            );
						})
                    )}

                    {showAnswers && (
                        <CorrectAnswerLine less={less} percentage={computePosition(question.correctAnswer)} value={question.correctAnswer} />
                    )}

					<div className='range-question__edge range-question__edge-max'>
						<p className='range-question__edge-value'>{question.max}</p>
					</div>
				</div>

				{!disabled && (
                    <AnswerForm 
                        initialValue={initial ?? undefined}
                        onSubmit={onSubmit}
                        disabled={typeof answer === 'number'}
                        questionId={question.id}
                    />
				)}
			</div>
		</section>
	);
};

export default RangeQuestion;
