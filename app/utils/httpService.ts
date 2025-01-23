import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // 개발 모드
    : ""; // 배포 모드

export const httpService = axios.create({
  baseURL,
});
