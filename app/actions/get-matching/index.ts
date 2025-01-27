"use server";

import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const matchingSchema = z.object({
  status: z.union([z.literal("SUCCESS"), z.literal("REJECTED")]),
  data: z.object({
    subject: z.array(z.string()),
    displayName: z.string(),
    createdAt: z.string(),
    location: z.array(z.string()),
  }),
});

type MatchingResponse = z.infer<typeof matchingSchema>;

export async function getMatching(matchingId: number) {
  try {
    const response = await httpService.get<MatchingResponse>(
      `/api/matching/${matchingId}`,
    );
    const parseResult = matchingSchema.safeParse(response.data);

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
