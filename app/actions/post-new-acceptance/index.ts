import { AxiosError } from "axios";

import { httpService } from "app/utils/httpService";

export async function postNewMatchingAcceptance({
  applicationId,
  teacherIds,
}: {
  applicationId: string;
  teacherIds: string[];
}) {
  try {
    const response = await httpService.post<string>(
      `/admin/details/matching/proposal/${applicationId}`,
      {
        teacherIds,
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      throw error; // 다른 에러는 그대로 던짐
    }
  }
}
