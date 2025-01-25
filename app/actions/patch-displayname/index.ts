"use server";

import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const displayNameSchema = z.object({
  status: z.union([z.literal("SUCCESS"), z.literal("REJECTED")]),
  data: z.object({
    display_name: z.string().optional(),
  }),
});

type displayNameResponse = z.infer<typeof displayNameSchema>;

export async function patchMatchingDisplayName({
  matchingId,
  displayName,
}: {
  matchingId: number;
  displayName: string;
}) {
  try {
    const response = await httpService.patch<displayNameResponse>(
      `/api/matching/${matchingId}/display_name`,
      {
        display_name: displayName,
      },
    );
    const parseResult = displayNameSchema.safeParse(response.data);

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
