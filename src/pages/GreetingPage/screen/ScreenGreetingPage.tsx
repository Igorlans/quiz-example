import { Page, PageTitle } from "@/ui";
import classes from './ScreenGreetingPage.module.scss';
import Image from "@/ui/Image/Image";
import { ResultsList } from "@/components/ResultsList";
import { usePlayersStore } from "@/shared/store/playersStore";
import { useGreeting } from "../hooks/useGreeting";
import { useParams } from "react-router-dom";
import { useOnPlayersReady } from "@/hooks/events/useOnPlayersReady";
import { useRoundRedirect } from "@/hooks/useRoundRedirect";

const ScreenGreetingPage = () => {
    const {gameId = null, tourId = null, roundId = null} = useParams();
    const {greeting} = useGreeting(roundId || tourId || gameId || null);
    const players = usePlayersStore(state => state.players);
    const { startingPageNavigate } = useRoundRedirect();
    
    useOnPlayersReady(() => {
        startingPageNavigate();
    })

    return (
        <Page className={classes['rules-page']}>
            <PageTitle title={greeting?.title} />

            <div className={classes['rules-page__content']}>
                <section className={classes['rules-page__text-section']}>
                    <h2 className={classes['rules-page__subtitle']}>
                        {greeting?.subtitle}
                    </h2>

                    <div className={classes['rules-page__text']}>
                        {greeting?.text && greeting.text.split('\n\n').map(paragraph => (
                            <p key={paragraph} className={classes['rules-page__text-paragraph']}>{paragraph}</p>
                        ))}
                    </div>
                </section>

                <section className={classes['rules-page__image-section']}>
                    <Image className={classes['rules-page__image']} src={greeting?.mainImage} />
                </section>
            </div> 

            {players.length ? <ResultsList players={players} /> : null}
        </Page>
    )
}

export default ScreenGreetingPage;