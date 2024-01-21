import ShareLink from '@/components/ShareLink/ShareLink';
import { useParams } from 'react-router-dom';

const ShareSection = () => {
    const {gameId} = useParams()

  return (
    <div className='screen__share'>
      <div className='screen__share-item'>
        <h5 className='screen__share-item-title'>Посилання на гру: </h5>
        <ShareLink>
          {`${window.location.origin}/client/games/${gameId}/connecting`}
        </ShareLink>
      </div>

      <div className='screen__share-item'>
        <h5 className='screen__share-item-title'>Посилання на екран: </h5>
        <ShareLink>
            {`${window.location.origin}/screen/games/${gameId}/connecting`}
        </ShareLink>
      </div>
    </div>
  );
};

export default ShareSection;
