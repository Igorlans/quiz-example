import { SHOW_ANSWERS_TIMEOUT } from "@/constants/timeouts";
import { useOnQueueQuestionFinished } from "@/hooks/events/useOnQueueQuestionFinished";
import { useOnQueueQuestionStarted } from "@/hooks/events/useOnQueueQuestionStarted";
import { useState } from "react"

export const useShowQueueAnswers = () => {
    const [showAnswers, setShowAnswers] = useState(false);
    const [showAnswersTimeoutPassed, setShowAnswersTimeoutPassed] = useState(false);

    useOnQueueQuestionFinished(() => {
        setShowAnswers(true)


        setTimeout(() => {
            setShowAnswersTimeoutPassed(true);
        }, SHOW_ANSWERS_TIMEOUT)
    })

    useOnQueueQuestionStarted(() => {
        setShowAnswers(false)
        setShowAnswersTimeoutPassed(false)
    })


    return { 
        showAnswers,
        showAnswersTimeoutPassed
    }
}