import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000" // 개발 모드
    : "https://2658d74c-2d23-41c2-8e9e-010551ee3f7b.mock.pstmn.io"; // 배포 모드

export const httpService = axios.create({
  baseURL,
});
