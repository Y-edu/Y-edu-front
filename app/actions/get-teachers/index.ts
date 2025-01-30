import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const teachersSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  subject: z.array(z.string()),
  fullName: z.string(),
  isActive: z.boolean(),
  acceptedCount: z.number(),
  totalCount: z.number(),
  school: z.string(),
  region: z.array(z.string()),
  youtubeLink: z.string().optional(),
  remark: z.string().optional(),
  gender: z.string(),
});
const teachersResponseSchema = z.array(teachersSchema);

type TeachersResponse = z.infer<typeof teachersResponseSchema>;

interface TeacherFilters {
  subject?: string[];
  school?: string[];
  gender?: string[];
  region?: string[];
  search?: string;
}

export async function getTeachers(
  filters: TeacherFilters = {},
): Promise<TeachersResponse> {
  try {
    const { subject, school, gender, region, search } = filters;
    const response = await httpService.get("/api/teachers", {
      params: {
        subject,
        school,
        gender,
        region,
        search,
      },
    });

    const parseResult = teachersResponseSchema.parse(response.data);
    return parseResult;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    }
    throw error;
  }
}
