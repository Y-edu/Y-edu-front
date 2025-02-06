import { httpService } from "../../../utils/httpService";

export interface LoginParams {
  id: string;
  password: string;
}

export const loginAPI = async (params: LoginParams): Promise<boolean> => {
  const { status } = await httpService.post("/admin/login", params, {
    withCredentials: true,
  });
  return status === 200;
};
