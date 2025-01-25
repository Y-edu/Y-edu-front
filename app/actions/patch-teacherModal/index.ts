import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const teacherModalSchema = z.object({
  data: z.object({
    id: z.number(),
    youtubeLink: z.string().optional(),
    remark: z.string().optional(),
  }),
});

type TeacherModalResponse = z.infer<typeof teacherModalSchema>;

export async function patchTeacherModal({
  id,
  youtubeLink,
  remark,
}: {
  id: number;
  youtubeLink?: string | undefined;
  remark?: string | undefined;
}) {
  try {
    const response = await httpService.patch<TeacherModalResponse>(
      `/api/teachers/${id}`,
      {
        youtubeLink,
        remark,
      },
    );
    const parseResult = teacherModalSchema.safeParse(response.data);

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
