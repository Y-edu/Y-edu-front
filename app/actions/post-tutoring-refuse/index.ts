import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const tutoringAccptanceSchema = z.object({
  status: z.union([z.literal("SUCCESS"), z.literal("REJECTED")]),
  data: z.string(),
});

type TutoringAcceptResponse = z.infer<typeof tutoringAccptanceSchema>;

export async function postTutoringRefuse({
  teacherId,
  matchingId,
  reason,
}: {
  matchingId: string;
  teacherId: string;
  reason: string;
}) {
  try {
    const response = await httpService.post<TutoringAcceptResponse>(
      `/api/teacher/${teacherId}/matching/${matchingId}/refuse`,
      {
        reason,
      },
    );
    const parseResult = tutoringAccptanceSchema.safeParse(response.data);

    if (!parseResult.success) {
      throw new Error("서버 데이터 형식과 일치하지 않습니다.");
    }

    return parseResult.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      throw error; // 다른 에러는 그대로 던짐
    }
  }
}
