export const calculateTimeLeft = (endOfTime: any) => {
  return new Date(`${endOfTime}Z`).getTime() - new Date().getTime();
};
