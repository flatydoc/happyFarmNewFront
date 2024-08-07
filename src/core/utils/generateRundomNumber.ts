export const generateRandomNumber = (min: number, max: number): number => {
  let baseProbability = 0.5;
  let randomNumber = Math.random();

  let index = Math.floor(randomNumber * (max - min + 1)) + min;

  let correctedProbability = baseProbability * Math.exp(-index / 200);

  if (randomNumber <= correctedProbability) {
    return index;
  } else {
    return generateRandomNumber(min, max);
  }
};
