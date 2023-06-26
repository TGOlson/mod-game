// inclusive, eg. randInt(1, 5) => pick([1, 2, 3, 4, 5])
export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
