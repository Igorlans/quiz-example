import ResultsList from "@/components/ResultsList/ResultsList"
import TitleWithTour from "@/components/TitleWithTour/TitleWithTour"
import { useOnPlayersReady } from "@/hooks/events/useOnPlayersReady"
import { Page } from '@/ui';
import { useGameStore } from "@/shared/store/gameStore"
import './ScreenResultsPage.scss'
import { usePlayersStore } from "@/shared/store/playersStore"
import { useRoundRedirect } from "@/hooks/useRoundRedirect";
import { useRoundStore } from "@/shared/store/roundStore";

const ScreenResultsPage = () => {
  const players = usePlayersStore(state => state.players);
  const buildStructure = useGameStore(state => state.buildStructure);
  const { startingPageNavigate } = useRoundRedirect();
  const isFinished = useRoundStore(state => state.round?.finished);

  useOnPlayersReady(() => {
    if (!isFinished) startingPageNavigate();
    
    buildStructure()
  })

  return (
    <Page className="screen-results">
      <TitleWithTour />

      <h2 className="screen-results__title">
        Результати:
      </h2>

      <ResultsList players={players} />
    </Page>
  )
}

export default ScreenResultsPage