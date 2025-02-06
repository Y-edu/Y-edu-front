import { httpService } from "../../../utils/httpService";

export const logoutAPI = async (): Promise<void> => {
  await httpService.post("/admin/logout", { withCredentials: true });
};
