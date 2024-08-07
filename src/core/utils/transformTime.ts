export const transformTime = (lastUsed: Date, interval: number) => {
  const lastUsedDate = new Date(lastUsed);
  const now = new Date();
  const newTimestamp = new Date(
    lastUsedDate.getTime() + interval * 60 * 60 * 1000
  );

  const nowMilliseconds = now.getTime();

  const timeUntilNextUsageInMinutes = Math.floor(
    (newTimestamp.getTime() - nowMilliseconds) / 1000 / 60
  );

  return timeUntilNextUsageInMinutes;
};
