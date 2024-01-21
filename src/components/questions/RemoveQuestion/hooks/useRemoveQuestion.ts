import {
	CORRECT_ANSWER_TIMEOUT,
	WRONG_ANSWER_TIMEOUT,
} from '@/constants/timeouts';
import { wait } from '@/shared/utils/wait';
import { QuestionAnswer } from '@/types/questions';
import {
    IRemoveQuestion,
	IRemoveQuestionAnswer,
	RemoveOption,
} from '@/types/questions/removeQuestion';
import { useEffect, useState } from 'react';

export const useRemoveQuestion = (question: IRemoveQuestion, initial: Maybe<QuestionAnswer<IRemoveQuestion>>) => {
	const [removedOptions, setRemovedOptions] = useState<IRemoveQuestionAnswer>(
		initial ?? []
	);
	const [selectedOption, setSelectedOption] =
		useState<Maybe<RemoveOption>>(null);

    useEffect(() => {
        setRemovedOptions(initial ?? []);
    }, [question.id]);

	useEffect(() => {
		setSelectedOption(null);
	}, [removedOptions.length]);

	const removeOption = (option: RemoveOption) => {
		const updatedOptions = [...removedOptions, option];
		setSelectedOption(option);

		wait(option.correct ? CORRECT_ANSWER_TIMEOUT : WRONG_ANSWER_TIMEOUT).then(
			() => {
				setRemovedOptions(updatedOptions);
			}
		);
	};

    return { removeOption, removedOptions, selectedOption };
};
