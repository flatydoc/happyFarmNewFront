import { endpoints } from "../configs/endpoints";
import { fetchData } from "../utils/fetchData";

export const getLeadersByLevel = (level: number, telegramId: string) =>
  fetchData(`${endpoints.leaders}`, {
    level,
    telegramId,
  });
