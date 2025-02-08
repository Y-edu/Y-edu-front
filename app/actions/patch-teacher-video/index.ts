import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

export async function patchTeacherVideo({
  teacherId,
  video,
}: {
  teacherId: string;
  video: string;
}) {
  try {
    const response = await httpService.put<string>(
      `/admin/teacher/video/${teacherId}`,
      {
        video,
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
