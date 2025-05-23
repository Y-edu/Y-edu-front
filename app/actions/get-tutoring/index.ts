import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "app/utils/httpService";

const dayTimeSchema = z.object({
  day: z.string(),
  times: z.array(
    z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Invalid time format"),
  ),
});

const tutoringResponse = z.object({
  applicationFormId: z.string(),
  classType: z.union([z.literal("수학"), z.literal("영어")]),
  age: z.string().optional(),
  classCount: z.string(),
  classTime: z.string(),
  pay: z.number().optional(),
  online: z.union([z.literal("대면"), z.literal("비대면")]),
  district: z.string(),
  dong: z.string(),
  goals: z.array(z.string()),
  favoriteStyle: z.string(),
  parentDayTimes: z.array(dayTimeSchema),
  teacherDayTimes: z.array(dayTimeSchema),
  matchStatus: z.union([
    z.literal("거절"),
    z.literal("대기"),
    z.literal("수락"),
    z.literal("전송"),
    z.literal("입금단계"),
    z.literal("매칭"),
    z.literal("최종매칭"),
    z.literal("과외결렬"),
  ]),
});

export type TutoringResponse = z.infer<typeof tutoringResponse>;

export async function getTutoring({ token }: { token: string }) {
  try {
    const response = await httpService.get<TutoringResponse>(
      `/matching/application?token=${token}`,
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
