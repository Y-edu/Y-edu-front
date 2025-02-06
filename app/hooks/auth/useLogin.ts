import { useState } from "react";

import { loginAPI, LoginParams } from "../../actions/get-auth/get-login";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (params: LoginParams) => {
    try {
      setLoading(true);
      setError(null);

      const data = await loginAPI(params);
      if (!data) throw new Error("로그인 실패");

      return true;
    } catch (err: any) {
      setError(err.message ?? "로그인 실패");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
