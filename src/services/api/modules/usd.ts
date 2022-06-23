import { makeAPI } from "@/services/api";

const api = makeAPI("https://api.coingecko.com/api/v3");

type usdResponse = Record<string, { usd: string | number }>;

export const fetchNativeUsdPrice = async (id: string) => {
  try {
    const { data } = await api.get<unknown, usdResponse>(
      `/simple/price?ids=${id}&vs_currencies=usd`
    );

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
