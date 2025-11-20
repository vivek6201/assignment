import axios, { type Method } from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const apiClient = async (
  endpoint: string,
  method: Method,
  params: Record<string, any>,
  body: any
) => {
  const apiConfig = {
    baseURL: `${BACKEND_URL}${endpoint}`,
    endpoint: endpoint,
    method: method,
    params,
    data: body,
  };
  return await axios(apiConfig);
};
