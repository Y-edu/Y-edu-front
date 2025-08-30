import { AxiosError } from "axios";

import { paymentHttpService } from "@/utils/httpService";

export async function postPaymentRequest({
  classCodes,
}: {
  classCodes: string[];
}) {
  try {
    const response = await paymentHttpService.post<string>(
      `/payments/request/class-matching-ids`, // 실제 엔드포인트로 변경 필요
      {
        classMatchingIds: classCodes,
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
