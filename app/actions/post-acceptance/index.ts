import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

export async function postMatchingAcceptance({
  classMatchingIds,
}: {
  classMatchingIds: string[];
}) {
  try {
    const response = await httpService.post<string>(
      `/admin/details/matching/recommend`,
      {
        classMatchingIds,
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
