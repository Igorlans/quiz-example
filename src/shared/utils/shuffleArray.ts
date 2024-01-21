export const shuffleArray = <T>(array: T[]): T[] => {
  // Make a copy of the array to avoid modifying the original
  const shuffledArray = [...array];

  // Loop through the array from the end to the beginning
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap the elements at the random index and the current index
    [shuffledArray[i], shuffledArray[randomIndex]] = [shuffledArray[randomIndex], shuffledArray[i]];
  }

  return shuffledArray;
}