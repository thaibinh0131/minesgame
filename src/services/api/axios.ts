import axios from "axios";
import { API_BASE_URL } from "@/constants/common";
/**
 * Create main axios instance
 */
const mainHTTP = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainHTTP;

/**
 * Create custom axios instance
 * @param baseURL Base URL to use in axios
 */
export const createHTTP = (baseURL: string) =>
  axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
