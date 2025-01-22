"use server";

import { z } from "zod";
import { AxiosError } from "axios";
import { httpService } from "../../utils/httpService";

const acceptanceSchema = z.object({
  status: z.union([z.literal("SUCCESS"), z.literal("REJECTED")]),
  data: z.object({
    nickname: z.string(),
    userId: z.number(),
    id: z.number(),
    name: z.string(),
    allReceiveAccetance: z.number(),
    receiveAccetance: z.number(),
    rejectReason: z.string().optional(),
    lastUpdated: z.string(),
  }),
});

type AcceptanceSchema = z.infer<typeof acceptanceSchema>;

export async function getAcceptance(matchingId: string) {
  ///api/matching/:id/acceptance
  try {
    const response = await httpService.get<AcceptanceSchema>(
      `/api/matching/${matchingId}/acceptance`,
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
      throw error; // 다른 에러는 그대로 던짐
    }
  }
}
