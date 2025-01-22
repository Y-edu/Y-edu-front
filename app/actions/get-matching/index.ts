"use server";

import { z } from "zod";
import axios, { AxiosError } from "axios";

const matchingSchema = z.object({
  status: z.union([z.literal("ACCEPTED"), z.literal("REJECTED")]),
  data: z.object({
    subject: z.array(z.string()),
    displayName: z.string(),
    createdAt: z.string(),
    location: z.array(z.string()),
  }),
});

type MatchingResponse = z.infer<typeof matchingSchema>;

export async function getMatching(id: string): Promise<MatchingResponse> {
  try {
    const response = await axios.get<MatchingResponse>(`/api/matching/${id}`);
    const parseResult = matchingSchema.safeParse(response.data);

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
