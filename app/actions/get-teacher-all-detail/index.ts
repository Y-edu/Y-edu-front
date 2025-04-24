import { httpService } from "@/utils/httpService";

import { DayOfWeek } from "../get-teacher-detail";

export interface TeacherTokenParams {
  token: string;
}

export interface TeacherAllDetailsResponse {
  matchingId: number;
  subject: string;
  profile: string;
  nickName: string;
  classCount: string;
  classTime: string;
  districts: string[];
  available: {
    [key in DayOfWeek]: string[];
  };
  comment: string;
  introduce: string;
  teachingHistory: number;
  teachingExperiences: string[];
  foreignExperiences?: string[];
  university: string;
  major: string;
  highSchool: string;
  teachingStyle1: string;
  teachingStyleInfo1: string;
  teachingStyle2: string;
  teachingStyleInfo2: string;
  teachingStyle: string;
  video?: string;
}

export async function getTeacherAllDetails(
  params: TeacherTokenParams,
): Promise<TeacherAllDetailsResponse> {
  const { token } = params;

  const res = await httpService.get<TeacherAllDetailsResponse>(
    `/bff/teacher/info?token=${token}`,
  );
  return res.data;
}
