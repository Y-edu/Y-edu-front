import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const matchingSchema = z.object({
  subject: z.string(),
  parentsId: z.number(),
  applicationFormId: z.string(),
  kakaoName: z.string().nullable(),
  phoneNumber: z.string(),
});

type MatchingResponse = z.infer<typeof matchingSchema>;

export async function getMatching(matchingId: string) {
  try {
    const response = await httpService.get<MatchingResponse>(
      `/admin/details/matching/parents/${matchingId}`,
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
