import { shuffleArray } from "@/shared/utils/shuffleArray";
import { useEffect, useState } from "react"

export const useShuffleOptions = <T>(questionId: ID, options: T[]): T[] => {
    const [shuffled, setShuffled] = useState<T[]>([]);

    useEffect(() => {
        setShuffled(shuffleArray(options))
    }, [questionId, options.length])

    return shuffled;
}