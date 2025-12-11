export const minutesLeft = (total: number): number =>
  Math.floor((total % (1000 * 60 * 60)) / (1000 * 60))
