import { httpService } from "../../../utils/httpService";

export interface LoginParams {
  id: string;
  password: string;
}

export const loginAPI = async (params: LoginParams): Promise<boolean> => {
  try {
    const response = await httpService.post("/admin/login", params, {
      withCredentials: true, // 쿠키 포함 요청
    });

    if (response.status === 200) {
      console.log("로그인 성공!");
      return true;
    }
    return false;
  } catch (error) {
    console.error("로그인 실패:", error);
    return false;
  }
};
