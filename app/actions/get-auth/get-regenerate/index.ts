import { httpService } from "../../../utils/httpService";
import { useAuthStore } from "../../../store/auth/useAuthStore";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
}

export const regenerateAPI = async (): Promise<boolean> => {
  const refreshToken = getCookie("refreshToken");
  if (!refreshToken) {
    alert("refreshToken이 존재하지 않습니다.");
    return false;
  }
  try {
    const response = await httpService.post(
      "/admin/regenerate",
      {},
      {
        headers: {
          RefreshToken: refreshToken,
        },
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      const authHeader = response.headers.authorization as string;
      const newAccessToken = authHeader
        ? authHeader.replace("Bearer ", "")
        : null;
      const newRefreshToken = response.headers.refreshtoken as string;

      if (newAccessToken && newRefreshToken) {
        useAuthStore.getState().setAccessToken(newAccessToken);
        document.cookie = `refreshToken=${newRefreshToken}; path=/; Secure; SameSite=Strict;`;
        return true;
      }
    }
  } catch (error) {
    alert(error);
    return false;
  }
  return false;
};
