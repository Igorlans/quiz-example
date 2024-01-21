
interface CorrectAnswerLineProps {
    less: boolean;
    percentage: number;
    value: number;
}

const CorrectAnswerLine = ({ percentage, less, value }: CorrectAnswerLineProps) => {
  return (
    <div
        className='range-question__correct'
        style={{
            [less ? 'bottom' : 'left']: `${percentage}%`,
        }}
    >
        <p className='range-question__correct-value'>
            {value}
        </p>
    </div>
  )
}

export default CorrectAnswerLine