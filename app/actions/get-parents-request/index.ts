import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const parentsRequestSchema = z.object({
  classCount: z.number(),
  classTime: z.number(),
  pay: z.number(),
  age: z.string(),
  wantedSubject: z.union([z.literal("수학"), z.literal("영어")]),
  online: z.string(),
  favoriteGender: z.string(),
  district: z.string(),
  dong: z.string(),
  goals: z.array(z.string()),
  teacherStyle: z.string(),
});

type ParentsRequestSchema = z.infer<typeof parentsRequestSchema>;

export async function getParentsRequest(macthingId: string) {
  try {
    const response = await httpService.get<ParentsRequestSchema>(
      `/admin/details/matching/class/${macthingId}`,
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
