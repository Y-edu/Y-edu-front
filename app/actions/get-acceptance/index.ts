"use server";

import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const acceptanceSchema = z.object({
  status: z.literal("SUCCESS"),
  lastUpdated: z.string().refine((date) => !isNaN(Date.parse(date))),
  data: z.array(
    z.object({
      status: z.union([
        z.literal("ACCEPTED"),
        z.literal("REJECTED"),
        z.literal("PENDING"),
        z.literal("SENDED"),
      ]),
      nickname: z.string(),
      userId: z.string(),
      id: z.number(),
      name: z.string(),
      allReceiveAccetance: z.number(),
      receiveAcceptance: z.number(),
      rejectReason: z.string().nullable(),
      lastUpdated: z.string().refine((date) => !isNaN(Date.parse(date))),
    }),
  ),
});

export type AcceptanceSchema = z.infer<typeof acceptanceSchema>;

export async function getAcceptance(matchingId: string) {
  /// api/matching/:id/acceptance
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
      throw error;
    }
  }
}
