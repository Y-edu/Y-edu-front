"use server";

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
});
const teachersResponseSchema = z.array(teachersSchema);

type TeachersResponse = z.infer<typeof teachersResponseSchema>;

export async function getTeachers(): Promise<TeachersResponse> {
  try {
    const response = await httpService.get(
      "http://localhost:3000/api/teachers",
    );

    const parseResult = teachersResponseSchema.parse(response.data);

    return parseResult;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    }
    throw error;
  }
}
