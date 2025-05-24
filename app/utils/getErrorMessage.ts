import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (typeof error.response?.data === "string") return error.response.data;

    return "서버 오류가 발생했어요.";
  }
  return "예상치 못한 오류가 발생했어요.";
}
