import { logoutAPI } from "@/actions/get-auth/get-logout";

export function useLogout() {
  const logout = async () => {
    await logoutAPI();
  };

  return { logout };
}
