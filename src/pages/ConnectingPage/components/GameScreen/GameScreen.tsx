import { Backdrop } from '@/ui';
import { useGameStore } from "@/shared/store/gameStore";
import { usePlayersStore } from "@/shared/store/playersStore";
import { Button } from "@/ui"
import { useUserStore } from '@/shared/store/userStore';

const GameScreen = () => {
  const players = usePlayersStore(state => state.players)
  const game = useGameStore(state => state.game)
  const startGame = useGameStore(state => state.startGame)
  const userId = useUserStore(state => state.user?.id);

  const handleStartGame = async () => {
    if (!game) return;
    // do not start the game if not all players are connected
    if (game.playersLimit > game.players.length) return; 
    await startGame()
  }

  return (
    <div className='screen__waiting-screen'>
      <Backdrop />

      <div className='screen__waiting-screen-content'>
        {/* if maximum players number was reached && player is creator && game was not started */}
        {players.filter((player) => player.connected).length === game?.playersLimit
        && userId === game.creator
        && !game?.gameState.startedAt ? (
          <Button 
            onClick={handleStartGame} 
            className='max-w-[400px] py-4 px-12 md:py-3 md:px-8 md:text-xl md:max-w-[300px] xs:py-2 xs:px-5 xs:text-lg xs:max-w-[260px]'
            isActive={true}
          >
            Розпочати
          </Button>
        ) : (
          <p className='screen__waiting-screen-text'>
            {players.filter((player) => player.connected).length === game?.playersLimit
              ? 'Очікуємо початку...'
              : game?.gameState.startedAt
              ? 'Гра розпочата'
              : 'Очікуємо гравців...'}
          </p>
        )}
      </div>
    </div>
  )
}

export default GameScreen