export const secondsLeft = (total: number): number =>
  Math.floor((total % (1000 * 60)) / 1000)
