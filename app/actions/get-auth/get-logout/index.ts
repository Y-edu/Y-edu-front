import { httpService } from "@/utils/httpService";
import { useAuthStore } from "@/store/auth/useAuthStore";

export const logoutAPI = async (): Promise<void> => {
  const accessToken = useAuthStore.getState().accessToken;
  await httpService.post(
    "/admin/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    },
  );
};
