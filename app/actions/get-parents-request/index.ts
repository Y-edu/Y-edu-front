"use server";

import { z } from "zod";
import { AxiosError } from "axios";

import { httpService } from "../../utils/httpService";

const parentsRequestSchema = z.object({
  data: z.object({
    classTime: z.string(),
    amount: z.number(),
    childAge: z.string(),
    subject: z.union([z.literal("ENGLISH"), z.literal("MATH")]),
    faceToFace: z.boolean(),
    teacherGender: z.string(),
    address: z.string(),
    purpose: z.string(),
    childLevel: z.string(),
    condition: z.string().max(200),
    preferredStyle: z.string().max(200),
    directivity: z.string().max(200),
  }),
});

type ParentsRequestSchema = z.infer<typeof parentsRequestSchema>;

export async function getParentsRequest(macthingId: string) {
  try {
    const response = await httpService.get<ParentsRequestSchema>(
      `/api/users/request/${macthingId}`,
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      throw error;
    }
  }
}
