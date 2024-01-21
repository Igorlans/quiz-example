import { Button } from '@/ui'
import ResultsList from '@/components/ResultsList/ResultsList'
import TitleWithTour from '@/components/TitleWithTour/TitleWithTour'
import { Page } from '@/ui';
import {motion} from 'framer-motion'
import { useState } from 'react'
import './ClientResultsPage.scss'
import { usePlayersStore } from '@/shared/store/playersStore'
import { useGreetingNavigate } from '@/hooks/useGreetingNavigate';

const ClientResultsPage = () => {
  const [isClickable, setIsClickable] = useState(false);
  const players = usePlayersStore(state => state.players)
  const { redirect } = useGreetingNavigate();

  const handleClick = () => {
    redirect();
  }

  return (
    <Page className="client-results">
      <TitleWithTour />

      <h2 className="client-results__title">
        Результати:
      </h2>

      <ResultsList players={players} />

      <motion.div
        initial={{x: 100, opacity: 0}}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 2.5, duration: .5, type: "spring", damping: 10, }}
        onAnimationComplete={() => {setIsClickable(true)}}
      >
        <Button 
          className='py-[8px] px-[30px] w-fit mx-auto'
          disabled={!isClickable}
          onClick={handleClick}
        >
          Поїхали далі
        </Button>
      </motion.div>
    </Page>
  )
}

export default ClientResultsPage