import { useState } from "react";

import { loginAPI, LoginParams } from "../../actions/get-auth/get-login";

export function useLogin() {
  const [loading, setLoading] = useState(false);

  const login = async (params: LoginParams) => {
    setLoading(true);

    try {
      return await loginAPI(params);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
}
