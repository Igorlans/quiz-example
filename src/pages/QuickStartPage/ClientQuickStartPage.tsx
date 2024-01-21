import PageTitle from '@/ui/PageTitle/PageTitle'
import {PlayerRegistrationForm, PlayerRegistrationFormData} from '@/modules/PlayerRegistrationForm'
import './ClientQuickStartPage.scss';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Page } from '@/ui';
import { useUserStore } from '@/shared/store/userStore';
import { useGameStore } from '@/shared/store/gameStore';
import { usePlayerStore } from '@/shared/store/playerStore';
import { createPlayer } from '@/shared/api/player/createPlayer';
import { STORAGE } from '@/constants/storage';

const ClientQuickStartPage = () => {
  const navigate = useNavigate();
  const {gameId} = useParams();
  const user = useUserStore(state => state.user)
  const game = useGameStore(state => state.game)
  const player = usePlayerStore(state => state.player);
  const setPlayer = usePlayerStore(state => state.setPlayer);

  useEffect(() => {
    if (user || player) {
      return navigate(`/client/games/${gameId}/connecting`, {replace: true})
    } 
  }, [user, player])


  const onSubmit = async (data: PlayerRegistrationFormData) => {
    if (!gameId || !game) return;

    const {username, avatar} = data;

    const newPlayerData = await createPlayer({
      username,
      avatar: avatar ?? ''
    })

    if (!newPlayerData) return;

    // setting local player in store
    setPlayer(newPlayerData);

    // set new data for reconnecting
    localStorage.setItem(STORAGE.SAVED_PLAYER, newPlayerData.id)
    
    navigate(`/client/games/${gameId}/connecting`)
  }

  return (
    <Page className='page quick-start'>
      <PageTitle title='Як тебе звати ?' />

      <PlayerRegistrationForm onSubmit={onSubmit} />
    </Page>  
  )
}

export default ClientQuickStartPage