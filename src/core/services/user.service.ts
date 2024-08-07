import { endpoints } from "../configs/endpoints";
import { postData } from "../utils/postData";

export const getPassiveIncome = async (telegramId: string) => {
  try {
    const response = await postData(`${endpoints.balance}`, {
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
