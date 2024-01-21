import { formatSeconds } from '@/helpers/formatSeconds';

import { ITimer } from '@/types/entities/timer';
import { Timestamp } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import classes from './timer.module.scss';
import SkeletonLoader from '../loaders/SkeletonLoader';
import Loader from '../loaders/Loader';

interface TimerProps {
  timer: Maybe<ITimer>;
  variant?: 'round' | 'raw';
  className?: string;
  isLoading?: boolean;
}

const Timer: React.FC<TimerProps> = ({timer, className, isLoading, variant = 'round'}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>();
  
  useEffect(() => {
    if (!timer?.startedAt) return;

    const startDateInMilliseconds = timer.startedAt.toMillis();

    const intervalId = setInterval(() => {
      const secondsElapsed = +((Date.now() - startDateInMilliseconds) / 1000).toFixed(0);
      const secondsLeft = timer.time - secondsElapsed;

      if (secondsLeft <= 0) {
        clearInterval(intervalId);
      } else {
        setSecondsLeft(secondsLeft);
      }
    }, 1000)

    return () => clearInterval(intervalId)
  }, [timer])

  return (
    <div className={`${classes.timer} ${classes[variant]} ${className}`}>
      {isLoading ? (
        <Loader className='w-[30%] h-[30%] border-custom_purple-700' />
      ) : (
        <p className={`${classes.timer__value}`}>
          {variant === 'raw' ? (secondsLeft && formatSeconds(secondsLeft)) : secondsLeft}
        </p>
      )}
    </div>
  )
}

export default Timer