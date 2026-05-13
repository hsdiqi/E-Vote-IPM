import axios from "axios";
import { setupInterceptors } from "./interceptor";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const apiPublic = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const apiPrivate = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// interceptor khusus private
setupInterceptors(apiPrivate);