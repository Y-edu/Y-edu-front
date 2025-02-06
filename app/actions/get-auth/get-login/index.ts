import { httpService } from "../../../utils/httpService";
import { useAuthStore } from "../../../store/auth/useAuthStore";

export interface LoginParams {
  id: string;
  password: string;
}

export const loginAPI = async (params: LoginParams): Promise<boolean> => {
  try {
    const response = await httpService.post("/admin/login", params, {
      withCredentials: true,
    });

    if (response.status === 200) {
      const authHeader =
        (response.headers.authorization as string) ||
        (response.headers.Authorization as string);
      // const refreshToken =
      //   (response.headers.refreshtoken as string) ||
      //   (response.headers.RefreshToken as string);

      const accessToken = authHeader ? authHeader.replace("Bearer ", "") : null;

      if (accessToken) {
        useAuthStore.getState().setAccessToken(accessToken);
        return true;
      }
    }
  } catch (error) {
    alert(error);
  }
  return false;
};
