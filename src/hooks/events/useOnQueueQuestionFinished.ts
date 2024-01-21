import { useRoundStore } from "@/shared/store/roundStore";
import { useEffect, useState } from "react"

/**
 * This trigger simply calls useEffect with custom checks/
 * There are 4 checks:
 *      1. Check if callback was already triggered so it doesn`t tigger for the second time
 *      2. Round must be of process type queue
 *      3. Round must have active question
 *      4. Timer for active question must be finished
 * 
 * @param callback - Function that executes when question is finished in `queue` round.
 */
export const useOnQueueQuestionFinished = (callback: () => void) => {
    const round = useRoundStore(state => state.round);
    const [triggered, setTriggered] = useState(false);

    
    useEffect(() => {
        if (!triggered) {
            return setTriggered(true);
        }

        if (
            round?.processType !== 'queue' 
            || !round.activeQuestion 
            || !round.timers[round.activeQuestion.id]?.finished
        ) return;

        callback();
    }, [round])
}