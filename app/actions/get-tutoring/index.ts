"use server";

import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const tutoringResponse = z.object({
  data: z.object({
    online: z.boolean(),
    subject: z.string(),
    district: z.string(),
    dong: z.string(),
    detail: z.string(),
    classCount: z.number(),
    classTime: z.number(),
    goal: z.string(),
    wantTime: z.string(),
    wantDirection: z.string(),
    favoriteCondition: z.string(),
    age: z.string(),
  }),
});

export type TutoringResponse = z.infer<typeof tutoringResponse>;

export async function getTutoring({
  teacherId,
  matchingId,
}: {
  teacherId: string;
  matchingId: string;
}) {
  try {
    const response = await httpService.get<TutoringResponse>(
      `/api/teacher/${teacherId}/matching/${matchingId}`,
    );
    const parseResult = tutoringResponse.safeParse(response.data);

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
