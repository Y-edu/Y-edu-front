import axios from "axios";

import { useAuthStore } from "../store/auth/useAuthStore";

const baseURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_PORT}` // 개발 모드
    : `${process.env.NEXT_PUBLIC_SERVER_URL}`; // 배포 모드

export const httpService = axios.create({
  baseURL,
});

httpService.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
