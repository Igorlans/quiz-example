import { FC } from "react"
import './Star.scss'

interface StarProps {
  score?: number;
}

const Star: FC<StarProps> = ({score}) => {
  return (
    <div className="star">
      <p className="star__score">
        {score}
      </p>
    </div>
  )
}

export default Star