import {
	SelectOption,
	ISelectQuestion,
} from '@/types/questions/selectQuestion';
import { Button } from '@/ui';

import { Avatar } from '@/ui';
import React, { useEffect, useMemo, useState } from 'react';
import './SelectQuestion.scss';
import { QuestionAnswer } from '@/types/questions';
import { QuestionProps } from '../types';
import { useShuffleOptions } from '@/hooks/useShuffleOptions';
import { IDatabasePlayer } from '@/types/entities/player';

interface SelectQuestionProps extends QuestionProps<ISelectQuestion> {}

const SelectQuestion: React.FC<SelectQuestionProps> = ({
	initial,
	players,
	question,
	disabled,
	onAnswer,
	showAnswers,
	showTitle,
	shuffleOptions,
	onFinish,
}) => {
	const shuffledOptions = useShuffleOptions(question.id, question?.options || []);
	const [selectedOption, setSelectedOption] =
		useState<Maybe<QuestionAnswer<ISelectQuestion>>>();

	useEffect(() => {
		setSelectedOption(null);
	}, [question.id]);

	const onSelect = async (option: SelectOption) => {
		setSelectedOption(option);

		onAnswer && onAnswer(option);
	};

	useEffect(() => {
		if (!selectedOption) return;

		onFinish && onFinish();
	}, [selectedOption]);

	return (
		<div className='select-question'> 
			{showTitle && <h2 className="select-question__title">{question.text}</h2>}

			<ul className='select-question__content'>
				{(shuffleOptions ? shuffledOptions : question?.options || []).map(
					(option) => {
						return (
							<li
								className='select-question__item'
								key={option.value}
							>
								<Button
									className='rounded-full p-4 h-full font-black select-question__option-button'
									// if selected option is correct highlight it with green color otherwise with red
									isCorrect={
										showAnswers
											? option.correct
											: selectedOption?.value === option.value 
											? selectedOption.correct
											: null
									}
									onClick={() => onSelect(option)}
									// disable all buttons if answer was selected
									disabled={disabled || !!selectedOption}
								>
									<p>{option.value}</p>
								</Button>

								{showAnswers && (
									<OptionResults
										option={option}
										players={players ?? []}
									/>
								)}
							</li>
						);
					}
				)}
			</ul>
		</div>
	);
};

interface OptionResultsProps {
	option: SelectOption;
	players: IDatabasePlayer[];
}

const OptionResults: React.FC<OptionResultsProps> = ({ option, players }) => {
	const optionPlayers = useMemo(
		() =>
			players.filter((player) => {
				const playerAnswer = player.activeQuestion?.answer as Maybe<
					QuestionAnswer<ISelectQuestion>
				>;

				return playerAnswer?.value === option.value;
			}),
		[players]
	);

	return (
		<ul className='select-question__answers'>
			{optionPlayers.map((player) => {
				return (
					<li
						className='select-question__player-answer'
						key={player.id}
					>
						<Avatar img={player.avatar} />
					</li>
				);
			})}
		</ul>
	);
};

export default SelectQuestion;
