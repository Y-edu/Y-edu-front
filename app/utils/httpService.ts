import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { useAuthStore } from "@/store/auth/useAuthStore";

const baseURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_PORT}` // 개발 모드
    : `${process.env.NEXT_PUBLIC_SERVER_URL}`; // 배포 모드

const paymentBaseURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_PAYMENT_URL_DEV}:${process.env.NEXT_PUBLIC_PAYMENT_PORT}` // 개발 모드
    : `${process.env.NEXT_PUBLIC_PAYMENT_URL_MAIN}`; // 배포 모드

export const httpService = axios.create({
  baseURL,
});

export const paymentHttpService = axios.create({
  baseURL: paymentBaseURL,
});

// 공통 인터셉터 함수들
const createResponseInterceptor = () => ({
  onSuccess: (response: AxiosResponse) => response,
  onError: (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return Promise.reject(new Error("Network Error"));
      }
      return Promise.reject(error);
    }
    return Promise.reject(new Error("Unknown Error"));
  },
});

const createRequestInterceptor = () => (config: InternalAxiosRequestConfig) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken && config.headers) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
};

// 기본 httpService 인터셉터 적용
const responseInterceptor = createResponseInterceptor();
httpService.interceptors.response.use(
  responseInterceptor.onSuccess,
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  responseInterceptor.onError,
);

httpService.interceptors.request.use(createRequestInterceptor());

// 결제 전용 httpService 인터셉터 적용
const paymentResponseInterceptor = createResponseInterceptor();
paymentHttpService.interceptors.response.use(
  paymentResponseInterceptor.onSuccess,
  // eslint-disable-next-line promise/prefer-await-to-callbacks
  paymentResponseInterceptor.onError,
);

paymentHttpService.interceptors.request.use(createRequestInterceptor());
