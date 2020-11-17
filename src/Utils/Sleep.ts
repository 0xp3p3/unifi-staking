export const sleep = (sleepTime: number) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), sleepTime);
  });
};
