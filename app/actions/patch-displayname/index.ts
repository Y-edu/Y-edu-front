import { AxiosError } from "axios";

import { httpService } from "app/utils/httpService";

export async function patchMatchingDisplayName({
  matchingId,
  displayName,
}: {
  matchingId: string;
  displayName: string;
}) {
  try {
    const response = await httpService.put<string>(
      `/admin/details/matching/parents/${matchingId}`,
      {
        kakaoName: displayName,
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      throw error;
    }
  }
}
