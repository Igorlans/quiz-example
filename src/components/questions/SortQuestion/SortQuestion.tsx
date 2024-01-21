import {
	WRONG_ANSWER_TIMEOUT,
	CORRECT_ANSWER_TIMEOUT,
} from '@/constants/timeouts';
import { Button } from '@/ui';
import { useEffect, useState } from 'react';
import './SortQuestion.scss';
import {
	ISortQuestionAnswer,
	ISortQuestion,
	OptionValue,
} from '@/types/questions/sortQuestion';
import { useSortSubject } from './hooks/useSortSubjects';
import { QuestionProps } from '../types';

interface SortQuestionProps extends QuestionProps<ISortQuestion> {}

const SortQuestion: React.FC<SortQuestionProps> = ({
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
	const [answer, setAnswer] = useState<ISortQuestionAnswer>(
		initial ?? []
	);
	const [answeredValue, setAnsweredValue] = useState<Maybe<OptionValue>>();
	const subject = useSortSubject(question, answer);

	useEffect(() => {
		if (answer.length !== question.subjects.length) return;

		onFinish && onFinish();
	}, [answer]);

	useEffect(() => {
		setAnsweredValue(null);
	}, [subject]);

	const optionClickHandler = (option: OptionValue) => {
		if (!subject) return;

		setAnsweredValue(option);

		const newAnswerOption: ISortQuestionAnswer[number] = {
			answeredValue: option,
			subject,
		};

		const isCorrect =
			newAnswerOption.subject.expected === newAnswerOption.answeredValue;

		setTimeout(
			() => {
				setAnswer([...answer, newAnswerOption]);
			},
			isCorrect ? CORRECT_ANSWER_TIMEOUT : WRONG_ANSWER_TIMEOUT
		);

		onAnswer && onAnswer([...answer, newAnswerOption]);
	};

	return (
		<div className='sort-question'>
			{showTitle && <h2 className="sort-question__title">{question.text}</h2>}

			<div className='sort-question__text'>
				<h3 className='sort-question__subject'>{subject?.name}</h3>
				<p className='sort-question__hint'>Обери за назвою</p>
			</div>

			<ul className='sort-question__options-list'>
				{question.options.map((option) => (
					<li
						className='sort-question__option'
						key={option}
					>
						<Button
							onClick={() => optionClickHandler(option)}
							className={'sort-question__option-button rounded-[50%] aspect-square p-2.5 w-[150px]'}
							isCorrect={
								option === answeredValue
									? subject?.expected === answeredValue
									: null
							}
							disabled={disabled || !!answeredValue}
						>
							{option}
						</Button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default SortQuestion;
