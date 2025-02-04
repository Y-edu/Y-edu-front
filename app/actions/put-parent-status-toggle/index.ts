import { httpService } from "../../utils/httpService";

export const putParentStatusToggle = async (
  applicationFormId: string,
): Promise<void> => {
  await httpService.put(`/admin/matching/${applicationFormId}`);
};
