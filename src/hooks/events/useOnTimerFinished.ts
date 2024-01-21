import { Timestamp } from 'firebase/firestore';
import { ITimer } from '@/types/entities/timer';

import { useEffect } from 'react';

export const useOnTimerFinished = (timer?: Maybe<ITimer>, callback?: () => any) => {
    useEffect(() => {
        if (!timer?.startedAt) return;

        const startDateInMillis = timer.startedAt.toMillis();

        const intervalId = setInterval(() => {
            const secondsElapsed = Math.floor((Date.now() - startDateInMillis) / 1000);
            const secondsLeft = timer.time - secondsElapsed;

            if (secondsLeft <= 0) {
                callback && callback();
                clearInterval(intervalId);
            }
        }, 1000)

        return () => clearInterval(intervalId);
    }, [timer])
}