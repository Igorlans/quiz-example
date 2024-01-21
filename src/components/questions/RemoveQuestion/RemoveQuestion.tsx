import {
	IRemoveQuestion,
	IRemoveQuestionAnswer,
	RemoveOption,
} from '@/types/questions/removeQuestion';
import { useEffect, useState } from 'react';
import { Button } from '@/ui';

import {
	CORRECT_ANSWER_TIMEOUT,
	WRONG_ANSWER_TIMEOUT,
} from '@/constants/timeouts';
import './RemoveQuestion.scss';
import { useRemoveOptions } from './hooks/useRemoveOptions';
import { wait } from '@/shared/utils/wait';
import { QuestionProps } from '../types';
import { useRemoveQuestion } from './hooks/useRemoveQuestion';

interface RemoveQuestionProps extends QuestionProps<IRemoveQuestion> {}

const RemoveQuestion: React.FC<RemoveQuestionProps> = ({
	initial,
	question,
	disabled,
	onAnswer,
	onFinish,
	players,
	showAnswers,
	showTitle,
	shuffleOptions,
}) => {
	const { removeOption, removedOptions, selectedOption } = useRemoveQuestion(
		question,
		initial ?? null
	);
	const options = useRemoveOptions(question, removedOptions);

	useEffect(() => {
		onAnswer && onAnswer(removedOptions);

		if (removedOptions.length === question.options.length) {
			onFinish && onFinish();
		}
	}, [removedOptions]);

	return (
		<div className='remove-question'>
			{showTitle && <h2 className='remove-question__title'>{question.text}</h2>}

			<ul className='remove-question__content'>
				{options.map((option, index) => (
					<li
						className='remove-question__item'
						key={option.value + index}
					>
						<Button
							className='rounded-full p-4 h-full font-black remove-question__option-button'
							isCorrect={selectedOption === option ? option.correct : null}
							onClick={() => removeOption(option)}
							// disable button if it was selected
							disabled={disabled || !!selectedOption}
						>
							{option.value}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default RemoveQuestion;
