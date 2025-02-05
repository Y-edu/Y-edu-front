import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

export async function patchTeacherIssue({
  teacherId,
  issue,
}: {
  teacherId: number;
  issue: string | null;
}) {
  try {
    const response = await httpService.put<string>(
      `/admin/teacher/issue/${teacherId}`,
      {
        issue,
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
