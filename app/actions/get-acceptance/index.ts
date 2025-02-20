import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "@/utils/httpService";

const acceptanceSchema = z.object({
  accept: z.number(),
  total: z.number(),
  time: z.number(),
  alarmTalkResponses: z.array(
    z.object({
      status: z.union([
        z.literal("거절"),
        z.literal("대기"),
        z.literal("수락"),
        z.literal("전송"),
      ]),
      nickName: z.string(),
      accept: z.number(),
      total: z.number(),
      classMatchingId: z.number(),
      name: z.string(),
      refuseReason: z.string().nullable(),
      teacherId: z.number(),
      subject: z.string(),
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
