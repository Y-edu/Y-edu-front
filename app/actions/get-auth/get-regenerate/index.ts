import { httpService } from "../../../utils/httpService";
import { useAuthStore } from "../../../store/auth/useAuthStore";

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length === 2 ? parts.pop()?.split(";").shift() || null : null;
}

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

export const regenerateAPI = async (): Promise<boolean> => {
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshToken = getCookie("refreshToken");
      if (!refreshToken) {
        alert("다시 로그인 해주세요.");
        return false;
      }

      const response = await httpService.post(
        "/admin/regenerate",
        {},
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
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
      return false;
    } catch (error) {
      alert("로그인 해주세요");
      // eslint-disable-next-line no-console
      console.error(error);
      return false;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};
