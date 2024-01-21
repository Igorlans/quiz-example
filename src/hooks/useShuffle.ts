import { shuffleArray } from "@/shared/utils/shuffleArray";
import { useRef } from "react"

export const useShuffle = <T>(array: T[]): T[] => {
    const ref = useRef<{ array: T[]; shuffled: T[] } | null>(null);
    
    if (!ref.current ||(JSON.stringify(ref.current.array) !== JSON.stringify(array))) {
        ref.current = {
            array,
            shuffled: shuffleArray(array),
        };
    }
    return ref.current.shuffled;
};