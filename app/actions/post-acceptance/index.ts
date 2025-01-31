import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const matchingAcceptanceSchema = z.object({
  status: z.union([z.literal("SUCCESS"), z.literal("REJECTED")]),
  data: z.string(),
});

type MatchingAcceptanceResponse = z.infer<typeof matchingAcceptanceSchema>;

export async function postMatchingAcceptance({
  matchingId,
  userIds,
}: {
  matchingId: string;
  userIds: string[];
}) {
  try {
    const response = await httpService.post<MatchingAcceptanceResponse>(
      `/api/matching/${matchingId}/acceptance`,
      {
        user: userIds,
      },
    );
    const parseResult = matchingAcceptanceSchema.safeParse(response.data);

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
