import { Page, PageTitle, Button } from "@/ui";
import { useGreeting } from "../hooks/useGreeting"
import classes from './ClientGreetingPage.module.scss';
import Image from "@/ui/Image/Image";
import { useGameStore } from "@/shared/store/gameStore";
import { useGreetingNavigate } from "@/hooks/useGreetingNavigate";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SHOW_GREETING_TIMEOUT } from "../constants";

const ClientGreetingPage = () => {
    const {gameId = null, tourId = null, roundId = null} = useParams();
    const {greeting} = useGreeting(roundId || tourId || gameId || null);
    const game = useGameStore(state => state.game);
    const { redirect, isReady } = useGreetingNavigate();
    const [timeoutPassed, setTimeoutPassed] = useState(false);
    const { pathname } = useLocation();


    useEffect(() => {
        setTimeoutPassed(false);

        setTimeout(() => {
            setTimeoutPassed(true)
        }, SHOW_GREETING_TIMEOUT)
    }, [pathname])

    const onClick = () => {
        setTimeoutPassed(false)
        isReady && redirect();
    };

    return (
        <Page className={classes['rules-page']}>
            <PageTitle title={greeting?.title} />

            {greeting?.secondaryImage ? (
                <Image className={classes['rules-page__secondary-image']} src={greeting?.secondaryImage} />
            ) : null}

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
                    {greeting?.mainImage ? (
                        <Image className={classes['rules-page__main-image']} src={greeting.mainImage} />
                    ) : null}
                    
                </section>
            </div> 

            <Button className={'mx-auto py-2 px-8 w-fit'} onClick={onClick} disabled={!timeoutPassed}>Зрозуміло</Button> 
        </Page>
    )
}

export default ClientGreetingPage    