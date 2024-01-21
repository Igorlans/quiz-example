import { Button, QR } from '@/ui'
import { Link } from 'react-router-dom';
import Player from '@/components/Player/Player';
import { Page } from '@/ui';
import GameScreen from '../components/GameScreen/GameScreen';
import ShareSection from '../components/ShareSection/ShareSection';
import { useGameStore } from '@/shared/store/gameStore';
import { useTemplatePlayers } from '../hooks/useTemplatePlayers';
import { useGreetingNavigate } from '@/hooks/useGreetingNavigate';
import { useEffect } from 'react';
import './ScreenConnectingPage.scss';
import { useGreetingsChecklist } from '@/pages/GreetingPage';
import { buildGamePath } from '@/shared/utils/buildGamePath';

const ScreenConnectingPage = () => {
  const game = useGameStore(state => state.game);
  const players = useTemplatePlayers();
  const {redirect, isReady} = useGreetingNavigate();
  const { clearChecklist } = useGreetingsChecklist();

  useEffect(() => {
    isReady && redirect();
  }, [isReady])

  useEffect(() => {
    clearChecklist();
  }, [])

  return (
    <Page className='screen__content'>
      <GameScreen />

      <div className='screen__qr-wrapper'>
        <div className='screen__qr'>
          <QR value={`${window.location.origin}/client/${buildGamePath([game?.id ?? null])}/connecting`} />
        </div>

        <Link to={`/client/${buildGamePath([game?.id ?? null])}/connecting`} target='_blank'>
          <Button className='text-base max-w-[260px] py-1.5 px-10 mt-5'>Кімната підключення</Button>
        </Link>
      </div>

      <ul className='screen__players-list'>
        {players?.map((player) => (
          <Player
            key={player.id}
            player={player}
            active={player.connected}
            showReadyState={true}
          />
        ))}
      </ul>

      <ShareSection />
    </Page>
  );
};

export default ScreenConnectingPage;
