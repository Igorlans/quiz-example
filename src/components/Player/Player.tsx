import { Avatar } from '@/ui';
import './Player.scss';
import {BsCheckLg} from 'react-icons/bs'
import { IDatabasePlayer, IPlayer } from '@/types/entities/player';



interface PlayerProps {
    player: IDatabasePlayer;
    showReadyState?: boolean;
    active?: boolean;
    score?: Maybe<number>;
}

const Player: React.FC<PlayerProps> = ({player, showReadyState, score, active = true}) => {
  return (
    <li className={`player ${active ? 'active' : ''}`}>
      {typeof score === 'number' && (
        <div className='player__score'>
          {Math.round(score)}
        </div>
      )}

        <Avatar img={player.avatar} className='player__avatar' />

        <h6 className='player__username'>
            {player.username}
        </h6>

        {showReadyState && (
          <div className="player__ready">
            {player.connected ? (
              <div className='player__ready-icon'>
                <BsCheckLg />
              </div>
            ) : (
              <p className='player__ready-text'>
                ще чекаємо
              </p>
            )}
          </div>
        )}
    </li>
  )
}

export default Player