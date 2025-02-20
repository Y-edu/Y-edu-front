import { loginAPI, LoginParams } from "@/actions/get-auth/get-login";

export function useLogin() {
  const login = async (params: LoginParams): Promise<boolean> => {
    return loginAPI(params);
  };

  return { login };
}
