export const calculateStars = (playersScores: number[], score: number): number => {
    const sortedScores = playersScores.sort((a, b) => a - b);

    return sortedScores.lastIndexOf(score) + 1;
}