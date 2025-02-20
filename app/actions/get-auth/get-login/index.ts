import { httpService } from "@/utils/httpService";
import { useAuthStore } from "@/store/auth/useAuthStore";

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
      const authHeader = response.headers.authorization as string;
      const refreshToken = response.headers.refreshtoken as string;

      const accessToken = authHeader ? authHeader.replace("Bearer ", "") : null;

      if (accessToken && refreshToken) {
        useAuthStore.getState().setAccessToken(accessToken);
        document.cookie = `refreshToken=${refreshToken}; path=/; Secure; SameSite=Strict;`;
        return true;
      }
    }
  } catch (error) {
    alert(error);
  }
  return false;
};
