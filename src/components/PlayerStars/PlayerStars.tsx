import { fillArray } from "@/shared/utils/fillArray";
import { FC, ReactNode } from "react";
import { Avatar } from '@/ui'
import Star from "../Star/Star";
import './PlayerStars.scss'


interface PlayerStarsProps {
  score: ReactNode;
  stars: number;
  avatar?: string;
  username: string;
}

const PlayerStars: FC<PlayerStarsProps> = ({ stars, username, avatar, score }) => {

  return (
    <div className="player-stars">
      <div className="player-stars__player">
        <div className="player-stars__score">
          {score}
        </div>

        <Avatar img={avatar} className='player-stars__player-avatar' />

        <p className="player-stars__username">{username}</p>
      </div>

      <ul className="player-stars__stars-list">
        {fillArray('1', stars).map((_, index) => (
          <div key={index} className="player-stars__star-container" style={{left: `${20 * (index)}px`}}>
            <Star  />
          </div>
        ))}
      </ul>
    </div>
  )
}

export default PlayerStars