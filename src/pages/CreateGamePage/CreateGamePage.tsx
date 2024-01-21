import { Button } from '@/ui'
import PageTitle from '@/ui/PageTitle/PageTitle';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Page } from '@/ui';
import { useUserStore } from '@/shared/store/userStore';
import { createGame } from './api/createGame';
import { useGameStore } from '@/shared/store/gameStore';
import GamePreview from './components/GamePreview';
import Counter from './components/Counter';
import { useCounterStore } from './store/counterStore';
import { useModel } from './hooks/useModel';
import { useState } from 'react';
import ComponentFadeLoader from '@/ui/loaders/ComponentFadeLoader';


const CreateGamePage = () => {
  const { modelId } = useParams();
  const {model} = useModel(modelId);
  const navigate = useNavigate();
  const resetGame = useGameStore(state => state.reset)
  const setGame = useGameStore(state => state.setGame)
  const user = useUserStore(state => state.user);
  const playersCount = useCounterStore(state => state.count)
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateGame = async () => {
    if (!model || !user?.id) return;
    // resetting previous game
    resetGame();

    setIsCreating(true);
    const newGameData = await createGame(model, user.id, playersCount);
    setIsCreating(false);

    if (!newGameData) return;
    setGame(newGameData);

    navigate(`/screen/games/${newGameData.id}/connecting`)
  }
  

  return (
    <Page>
      <div className="flex items-center justify-between md:flex-col md:justify-normal">
        <section className='mb-12'>
          <PageTitle title={model?.title} />

          <div className='flex flex-col items-center justify-center mt-9 md:mt-7'>
            <Counter />

            <Button 
              onClick={handleCreateGame} 
              className='relative overflow-hidden py-3 px-6 max-w-[220px] rounded-[70px] text-2xl md:max-w-[180px] md:text-xl' 
              disabled={isCreating}
            >
              Розпочати

              {isCreating ? <ComponentFadeLoader className='border-gray-200' /> : null}
            </Button>
          </div>
        </section>

        {!!model && <GamePreview gameModel={model} />}
      </div>
    </Page>
  )
}

export default CreateGamePage