import { shuffleArray } from "./shuffleArray";

export const getRandomArrayElements = <T>(array: T[], limit: number = 4): T[] => {
    const result = shuffleArray(array);

    return result.slice(0, limit);
}