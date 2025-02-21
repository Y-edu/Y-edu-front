import { AxiosError } from "axios";

import { httpService } from "app/utils/httpService";

export async function postTutoringRefuse({
  applicationFormId,
  teacherId,
  phoneNumber,
  refuseReason,
}: {
  applicationFormId: string;
  teacherId: string;
  phoneNumber: string;
  refuseReason: string;
}) {
  try {
    const response = await httpService.put<string>(
      `/matching/application/refuse/${applicationFormId}/${teacherId}/${phoneNumber}`,
      {
        refuseReason,
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
