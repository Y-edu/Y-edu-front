import { AxiosError } from "axios";

import { httpService } from "app/utils/httpService";

export interface PostScheduleRequest {
  classMatchingId: string;
}

export interface PostScheduleResponse {
  classScheduleManagementId: string;
}

export async function postMatchingSchedule({
  classMatchingId,
}: PostScheduleRequest): Promise<string> {
  try {
    const response = await httpService.post<PostScheduleResponse>(
      `/matching/schedule`,
      { classMatchingId },
    );

    return response.data.classScheduleManagementId;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      throw error;
    }
  }
}
