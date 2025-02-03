import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? `${process.env.NEXT_PUBLIC_SERVER_URL}:${process.env.NEXT_PUBLIC_PORT}` // 개발 모드
    : `${process.env.NEXT_PUBLIC_SERVER_URL}`; // 배포 모드

export const httpService = axios.create({
  baseURL,
});
