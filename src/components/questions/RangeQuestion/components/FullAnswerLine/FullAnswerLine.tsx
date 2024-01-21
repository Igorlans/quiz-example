import { Avatar } from "@/ui";

interface FullAnswerLineProps {
	answer?: Maybe<number>;
	gap?: Maybe<number>;
	avatar?: string;
	less?: boolean;
}

const FullAnswerLine: React.FC<FullAnswerLineProps> = ({
	answer,
	gap,
	avatar,
	less,
}) => {
	return (
		<div
			className='range-question__answer'
			style={{ [less ? 'bottom' : 'left']: `${gap}%` }}
		>
			<p className='range-question__answer-value'>{answer}</p>
			<Avatar
				img={avatar}
				className='range-question__answer-avatar'
			/>
		</div>
	);
};

export default FullAnswerLine;