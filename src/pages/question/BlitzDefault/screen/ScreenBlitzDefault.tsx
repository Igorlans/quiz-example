import PlayersList from "@/components/PlayersList/PlayersList"
import TitleWithTour from "@/components/TitleWithTour/TitleWithTour"
import ProcessMismatchError from "@/components/errors/ProcessMismatchError"
import { useOnRoundFinished } from "@/hooks/events/useOnRoundFinished"
import { usePlayersStore } from "@/shared/store/playersStore"
import { useRoundStore } from "@/shared/store/roundStore"
import { QuestionTypesTranslation } from "@/shared/translations/questionTypes"
import { Page, Timer } from "@/ui"
import { useNavigate } from "react-router-dom"
import classes from './ScreenBlitzDefault.module.scss'
import { useOnFocusChange } from "@/hooks/events/useOnFocusChange"
import { useScreenFinishedRoundNavigate } from "@/hooks/useScreenFinishedRoundNavigate"

const ScreenBlitzDefault = () => {
  const round = useRoundStore(state => state.round);
  const players = usePlayersStore(state => state.players);
  const navigate = useScreenFinishedRoundNavigate();

  useOnFocusChange(() => {
    setTimeout(() => {
      navigate();
    }, 3_000)
  })

  // chech if round matches blitz process type
  if (round?.processType !== 'blitz') return (
    <ProcessMismatchError expected="blitz" got={round?.processType ?? null} />
  );

  return (
    <Page>
      <TitleWithTour>{QuestionTypesTranslation[round?.questionsType || 'select']}</TitleWithTour>

      <div
            className={classes['page-content']}
        >
            <h2 className={classes['page-content__title']}>
                Раунд
                <span className={classes['page-content__title_bold']}>
                    {QuestionTypesTranslation[round?.questionsType || 'select']}
                </span>
            </h2>

            <h5 className={classes['page-content__post-title']}>
                У гравців є одна хвилина аби дати якомога більше правильних
                відповідей
            </h5>

            <Timer
                className={classes['page-content__timer']}
                timer={round.timer}
                variant={'raw'}
            />

            <PlayersList players={players} showScore={false} />
        </div>
    </Page>
  )
}

export default ScreenBlitzDefault