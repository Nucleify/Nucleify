export const hoursLeft = (total: number): number =>
  Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
