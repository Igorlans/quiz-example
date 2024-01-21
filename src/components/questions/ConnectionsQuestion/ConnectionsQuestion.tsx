import { useEffect, useState } from 'react';
import './ConnectionsQuestion.scss';
import { useConnectionOptions } from './hooks/useConnectionOptions';
import Option from './subcomponents/Option';
import { wait } from '@/shared/utils/wait';
import {
	AnyConnectionOption,
	IConnectionsOption,
	IConnectionsQuestion,
	LockedPair,
	SelectedOptions,
} from '@/types/questions/connectionsQuestion';
import { QuestionProps } from '../types';
import { CORRECT_ANSWER_TIMEOUT } from '@/constants/timeouts';

interface ConnectionsQuestionProps
	extends QuestionProps<IConnectionsQuestion> {}

const ConnectionsQuestion: React.FC<ConnectionsQuestionProps> = ({
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
	const [lockedPairs, setLockedPairs] = useState<LockedPair[]>(initial ?? []);
	const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
		answerOption: null,
		questionOption: null,
	});
	const { answerOptions, questionOptions } = useConnectionOptions(
		question,
		lockedPairs
	);

	// when question changes => reset state
	useEffect(() => {
		setLockedPairs(initial ?? []);
		unselect();
	}, [question]);

	useEffect(() => {
		if (!selectedOptions.answerOption || !selectedOptions.questionOption)
			return;

		const newPair: LockedPair = {
			answer: selectedOptions.answerOption,
			question: selectedOptions.questionOption,
		};

		wait(CORRECT_ANSWER_TIMEOUT).then(() => {
			// try to lock pairs
			const updatedPairs = lockPair(newPair);

			unselect();

			if (!updatedPairs) return;

			onAnswer && onAnswer(updatedPairs);
		});
	}, [selectedOptions]);

	const highlightOption = (option: AnyConnectionOption): Maybe<boolean> => {
		// if not all options selected => do not highlight
		if (!selectedOptions.answerOption || !selectedOptions.questionOption)
			return null;
		// if option is not one of selected => do not highlight
		if (
			option !== selectedOptions.questionOption &&
			option !== selectedOptions.answerOption
		)
			return null;

		if (
			selectedOptions.questionOption.key === selectedOptions.answerOption.key
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleClick = (option: AnyConnectionOption) => {
		select(option);
	};

	// selects option
	const select = (option: AnyConnectionOption) => {
		if (option.type === 'question') {
			setSelectedOptions({
				...selectedOptions,
				questionOption: option as IConnectionsOption<'question'>,
			});
		} else if (option.type === 'answer') {
			setSelectedOptions({
				...selectedOptions,
				answerOption: option as IConnectionsOption<'answer'>,
			});
		}
	};

	// unselects option
	const unselect = () => {
		setSelectedOptions({
			answerOption: null,
			questionOption: null,
		});
	};

	// Pairs can be locked only if they are matching by key
	const lockPair = (newPair: LockedPair) => {
		// keys doesnt match => answer is wrong
		if (newPair.answer.key !== newPair.question.key) return;
		const updatedPairs = [...lockedPairs, newPair];

		setLockedPairs(updatedPairs);

		return updatedPairs;
	};

	return (
		<div className='connections-question'>
			{showTitle && <h2 className="remove-question__title">{question.text}</h2>}

			<div
				className='connections-question__content'
				onClick={unselect}
			>
				<div className='connections-question__left connections-question__side'>
					<h5 className='connections-question__side-title'>
						{question.question.title}
					</h5>

					<ul className='connections-question__options'>
						{questionOptions.map((option) => (
							<Option
								key={option.value}
								option={option}
								isCorrect={highlightOption(option)}
								isActive={selectedOptions.questionOption?.key === option.key}
								disabled={
									disabled ||
									lockedPairs.some(
										(pair) => pair.question.key === option.key
									) ||
									(!!selectedOptions.questionOption &&
										selectedOptions.questionOption.key !== option.key)
								}
								onClick={() => handleClick(option)}
							/>
						))}
					</ul>
				</div>

				<div className='connections-question__right connections-question__side'>
					<h5 className='connections-question__side-title'>
						{question.answer.title}
					</h5>

					<ul className='connections-question__options'>
						{answerOptions.map((option) => (
							<Option
								key={option.value}
								isActive={selectedOptions.answerOption?.key === option.key}
								disabled={
									disabled ||
									lockedPairs.some((pair) => pair.answer.key === option.key) ||
									(!!selectedOptions.answerOption &&
										selectedOptions.answerOption.key !== option.key)
								}
								isCorrect={highlightOption(option)}
								option={option}
								onClick={() => handleClick(option)}
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ConnectionsQuestion;
