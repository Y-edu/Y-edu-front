import axios from "axios";

import { useAuthStore } from "@/store/auth/useAuthStore";

const baseURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_PORT}` // 개발 모드
    : `${process.env.NEXT_PUBLIC_SERVER_URL}`; // 배포 모드

export const httpService = axios.create({
  baseURL,
});

httpService.interceptors.response.use(
  (response) => response,
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  (error: unknown) => {
    if (axios.isAxiosError(error)) {
      return Promise.reject(new Error(`Axios Error: ${error.message}`));
    }

    if (error instanceof Error) {
      return Promise.reject(error);
    }

    return Promise.reject(new Error("Unknown Error"));
  },
);

httpService.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
