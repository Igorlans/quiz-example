interface AnswerLineProps {
    value: number;
    percentage: number;
    less: boolean;
}

const AnswerLine = ({ value, less, percentage }: AnswerLineProps) => {
  return (
    <div
        className='range-question__client-answer'
        style={{
            [less ? 'bottom' : 'left']: `${percentage}%`,
        }}
    >
        <p className='range-question__client-answer-value'>{value}</p>
    </div>
  )
}

export default AnswerLine