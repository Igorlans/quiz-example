import ConnectionsQuestion from './ConnectionsQuestion/ConnectionsQuestion';
import RangeQuestionComponent from './RangeQuestion/RangeQuestion';
import RemoveQuestion from './RemoveQuestion/RemoveQuestion';
import SelectQuestion from './SelectQuestion/SelectQuestion';
import SortQuestion from './SortQuestion/SortQuestion';
import { AnyQuestion, QuestionAnswer } from '@/types/questions';
import { OnAnswerCallback, QuestionProps } from './types';
import { ISortQuestion } from '@/types/questions/sortQuestion';
import { ISelectQuestion } from '@/types/questions/selectQuestion';
import { IRemoveQuestion } from '@/types/questions/removeQuestion';
import { IConnectionsQuestion } from '@/types/questions/connectionsQuestion';
import { IRangeQuestion } from '@/types/questions/rangeQuestion';

type Props<T extends AnyQuestion> = QuestionProps<T>;

const Question = <T extends AnyQuestion>({
	question,
	onAnswer,
	initial,
	...props
}: Props<T>) => {
	return question.type === 'select' ? (
		<SelectQuestion
			question={question}
			onAnswer={onAnswer as OnAnswerCallback<ISelectQuestion>}
			initial={initial as QuestionAnswer<ISelectQuestion>}
			{...props}
		/>
	) : question?.type === 'sort' ? (
		<SortQuestion
			question={question}
			initial={initial as QuestionAnswer<ISortQuestion>}
			onAnswer={onAnswer as OnAnswerCallback<ISortQuestion>}
			{...props}
		/>
	) : question?.type === 'remove' ? (
		<RemoveQuestion
			question={question}
			onAnswer={onAnswer as OnAnswerCallback<IRemoveQuestion>}
			initial={initial as QuestionAnswer<IRemoveQuestion>}
			{...props}
		/>
	) : question?.type === 'connections' ? (
		<ConnectionsQuestion
			question={question}
			onAnswer={onAnswer as OnAnswerCallback<IConnectionsQuestion>}
			initial={initial as QuestionAnswer<IConnectionsQuestion>}
			{...props}
		/>
	) : question?.type === 'range' ? (
		<RangeQuestionComponent
			question={question}
			onAnswer={onAnswer as OnAnswerCallback<IRangeQuestion>}
			initial={initial as QuestionAnswer<IRangeQuestion>}
			{...props}
		/>
	) : null;
};

export default Question;
