import { useRoundStore } from "@/shared/store/roundStore";
import { useEffect, useState } from "react";

export const useOnQueueQuestionStarted = (callback: () => void) => {
    const round = useRoundStore(state => state.round);
    const [triggered, setTriggered] = useState(false);

    
    useEffect(() => {
        if (
            round?.processType !== 'queue'
        ) return;

        if (triggered) {
            callback();
        } else {
            setTriggered(true);
        }
    }, [
        round?.processType === 'queue' 
            ? Object.keys(round.timers).length 
            : null
        ]
    )
}