export const gaussianRandom = (mean: number = 0, std: number = 1): number => {
  let u1: number, u2: number;
  do {
    u1 = Math.random();
    u2 = Math.random();
  } while (u1 === 0);  // Convert [0,1) to (0,1)

  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  // const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);  // Another Gaussian noise

  return z0 * std + mean;
};
