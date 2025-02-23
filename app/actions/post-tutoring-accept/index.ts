import { AxiosError } from "axios";

import { httpService } from "app/utils/httpService";

export async function postTutoringAccept({
  applicationFormId,
  teacherId,
  phoneNumber,
}: {
  phoneNumber: string;
  teacherId: string;
  applicationFormId: string;
}) {
  try {
    const response = await httpService.put<string>(
      `/matching/application/accept/${applicationFormId}/${teacherId}/${phoneNumber}`,
      {},
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
