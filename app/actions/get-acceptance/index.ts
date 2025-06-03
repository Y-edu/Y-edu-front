import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "@/utils/httpService";
import { MATCHING_STATUS } from "@/constants/matching";

const acceptanceSchema = z.object({
  accept: z.number(),
  total: z.number(),
  time: z.number(),
  alarmTalkResponses: z.array(
    z.object({
      status: z.enum([
        MATCHING_STATUS.REJECT,
        MATCHING_STATUS.WAITING,
        MATCHING_STATUS.ACCEPT,
        MATCHING_STATUS.SENT,
        MATCHING_STATUS.PAYMENT,
        MATCHING_STATUS.MATCHING,
        MATCHING_STATUS.FINAL_MATCH,
        MATCHING_STATUS.TUTORING_END,
        MATCHING_STATUS.TEMPORARY_STOP,
        MATCHING_STATUS.STOP,
      ]),
      nickName: z.string(),
      accept: z.number(),
      total: z.number(),
      classMatchingId: z.number(),
      name: z.string(),
      refuseReason: z.string().nullable(),
      teacherId: z.number(),
      subject: z.string(),
      phoneNumber: z.string(),
    }),
  ),
});

export type AcceptanceSchema = z.infer<typeof acceptanceSchema>;

export async function getAcceptance(applcationFormId: string) {
  /// api/matching/:id/acceptance
  try {
    const response = await httpService.get<AcceptanceSchema>(
      `/admin/details/matching/alarm/${applcationFormId}`,
    );
    const parseResult = acceptanceSchema.safeParse(response.data);

    if (!parseResult.success) {
      throw new Error("서버 데이터 형식과 일치하지 않습니다.");
    }

    return parseResult.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      throw error;
    }
  }
}
