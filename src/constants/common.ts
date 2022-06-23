export const DEFAULT_CHAIN_ID = Number(import.meta.env.VITE_DEFAULT_CHAIN);
export const DEFAULT_GAS_LIMIT = import.meta.env
  .VITE_DEFAULT_GAS_LIMIT as string;
export const GAS_LIMIT_BUFFER_RATIO = import.meta.env
  .VITE_GAS_LIMIT_BUFFER_RATIO as string;
export const GAS_PRICE_BUFFER_RATIO = import.meta.env
  .VITE_GAS_PRICE_BUFFER_RATIO as string;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;
export const APP_ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT as string;
export const SAVED_CONNECTOR_KEY = "SAVED_CONNECTOR";

export const CONTRACT_INTERVAL = 15000; // ms
export const APP_TITLE = import.meta.env.VITE_APP_TITLE;
export const MAX_MINES_AND_FLAGS = 40;
