import TitleWithTour from "@/components/TitleWithTour/TitleWithTour"
import ProcessMismatchError from "@/components/errors/ProcessMismatchError";
import { usePlayersStore } from "@/shared/store/playersStore";
import { useRoundStore } from "@/shared/store/roundStore"
import { QuestionTypesTranslation } from "@/shared/translations/questionTypes";
import { Page, Timer } from "@/ui"
import { useNavigate } from "react-router-dom";
import { useGameStore } from "@/shared/store/gameStore";
import { useEffect, useState } from "react";
import classes from './ScreenQueueFinale.module.scss';
import Question from "@/components/questions/Question";
import BottomLoader from "@/ui/loaders/BottomLoader";
import { useShowQueueAnswers } from "@/hooks/useShowQueueAnswers";

const ScreenQueueFinale = () => {
  const navigate = useNavigate();
  const round = useRoundStore(state => state.round);
  const players = usePlayersStore(state => state.players);
  const gameId = useGameStore(state => state.game?.id); 
  const { showAnswers, showAnswersTimeoutPassed } = useShowQueueAnswers();


  useEffect(() => {
    if (!showAnswersTimeoutPassed) return;

    navigate(`/screen/games/${gameId}/stars/final`);
  }, [showAnswersTimeoutPassed])



  if (round?.processType !== 'queue') return (
    <ProcessMismatchError expected="queue" got={round?.processType ?? null} />
  )

  return (
    <Page>
      <TitleWithTour>{QuestionTypesTranslation[round?.questionsType || 'select']}</TitleWithTour>

      <div className={classes['page-content']}>
        <section className={classes['page-content__top-section']}>
          <div className={classes['page-content__title-wrapper']}> 
            <h2 className={classes['page-content__title']}>Фінальний раунд</h2>
            <p className={classes['page-content__post-title']}>У цьому раунді молодець той, хто дасть відповідь найближче до правильної</p>
          </div>

          {round.activeQuestion && (
              <Timer className={classes['page-content__timer']} variant="raw" timer={round.timers[round.activeQuestion?.id]} isLoading={!round.activeQuestion} />
          )}
        </section>

        {!round.activeQuestion && (
           <BottomLoader>Пошук питань</BottomLoader>
        )}

        {round.activeQuestion && (
          <Question 
            question={round.activeQuestion}
            disabled={true}
            showAnswers={showAnswers}
            shuffleOptions={false}
            players={players}
          />
        )}
      </div>
    </Page>
  )
}

export default ScreenQueueFinale