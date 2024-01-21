import PageTitle from "@/ui/PageTitle/PageTitle"
import './TitleWithTour.scss'
import { useGameStore } from "@/shared/store/gameStore";

interface TitleWithTourProps {
  children?: React.ReactNode;
}

const TitleWithTour: React.FC<TitleWithTourProps> = ({ children }) => {
  const structure = useGameStore(state => state.structure);
  const game = useGameStore(state => state.game)

  return (
    <section className='title-tour'>
        <PageTitle title={children || game?.title} />
        <p className='title-tour__tour-value'>{(structure?.tours.findIndex(tour => tour?.value.id === game?.gameState.focus.tour) || 0) + 1}-й тур</p>
    </section>
  )
}

export default TitleWithTour