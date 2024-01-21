import { Button, QR } from '@/ui'
import { Page } from '@/ui';
import PageTitle from '@/ui/PageTitle/PageTitle'
import { useGameStore } from '@/shared/store/gameStore';
import './GameFinishPage.scss'

const GameFinishPage = () => {
  const game = useGameStore(state => state.game);
  const finalScreen = useGameStore(state => state.game?.finalScreen);

  return (
    <Page className='end-page'>

      <PageTitle title={game?.title} />
      
      <h1 className='end-page__title'> 
        Дякуємо за гру
      </h1>

      <div className="end-page__content">
        <section className="end-page__donate">
          <p className='end-page__donate-text'>
            {finalScreen?.text}
          </p>

          <a href={finalScreen?.qrCode ?? ''} target='_blank' className='end-page__donate-link'>
            <Button className='py-2.5 px-4 w-[140px] text-sm md:px-2.5 md:py-1.5'>
              Донати
            </Button>
          </a>
        </section>
        
        <QR value={finalScreen?.qrCode ?? ''} />
      </div>
    </Page>
  )
}

export default GameFinishPage