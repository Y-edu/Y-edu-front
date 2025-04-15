import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "app/utils/httpService";

const parentsRequestSchema = z.object({
  classCount: z.string(),
  classTime: z.string(),
  pay: z.number(),
  age: z.string(),
  wantedSubject: z.union([z.literal("수학"), z.literal("영어")]),
  favoriteGender: z.string(),
  district: z.string(),
  dong: z.string(),
  online: z.string(),
  wantTime: z.string(),
  goals: z.array(z.string()),
  teacherStyle: z.string(),
  referral: z.string(),
  scheduledClasses: z
    .array(
      z.object({
        day: z.string(),
        startTime: z.string(),
        classTime: z.number(),
      }),
    )
    .optional(),
  firstDay: z.string().nullable().optional(),
  firstDayStart: z.string().nullable().optional(),
  textBook: z.string().nullable().optional(),
});

type ParentsRequestSchema = z.infer<typeof parentsRequestSchema>;

export async function getParentsRequest(matchingId: string) {
  try {
    const response = await httpService.get<ParentsRequestSchema>(
      `/admin/details/matching/class/${matchingId}`,
    );

    return parentsRequestSchema.parse(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      throw error;
    }
  }
}
