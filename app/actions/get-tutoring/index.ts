import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const tutoringResponse = z.object({
  applicationFormId: z.string(),
  classType: z.union([z.literal("수학"), z.literal("영어")]),
  age: z.string().optional(),
  classCount: z.string(),
  classTime: z.string(),
  online: z.union([z.literal("대면"), z.literal("비대면")]),
  district: z.string(),
  dong: z.string(),
  goals: z.array(z.string()),
  favoriteStyle: z.string(),
  favoriteTime: z.string(),
});

export type TutoringResponse = z.infer<typeof tutoringResponse>;

export async function getTutoring({
  teacherId,
  applcationFormId,
  phoneNumber,
}: {
  teacherId: string;
  applcationFormId: string;
  phoneNumber: string;
}) {
  try {
    const response = await httpService.get<TutoringResponse>(
      `/matching/application/${applcationFormId}/${teacherId}/${phoneNumber}`,
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
