import { endpoints } from "../configs/endpoints";
import { fetchData } from "../utils/fetchData";
import { postData } from "../utils/postData";

export const getGoods = (telegramId: string) =>
  fetchData(`${endpoints.resources}`, {
    telegramId,
  });

export const buyResource = async (id: number, telegramId: string) => {
  try {
    const response = await postData(`${endpoints.resources}/${id}`, {
      telegramId,
    });
    if (!response || !response.data) {
      throw new Error("Response data is missing");
    }
    return response.data;
  } catch (error: any) {
    console.error("Error", error);
    throw error;
  }
};
