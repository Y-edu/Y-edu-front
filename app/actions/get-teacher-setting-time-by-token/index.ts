import { httpService } from "@/utils/httpService";
import { DayOfWeek } from "@/actions/get-teacher-setting-info";

export interface TeacherSettingTimeByTokenParams {
  token: string;
}

export interface TeacherSettingTimeByTokenResponse {
  disctricts: Array<string>;
  available: {
    [key in DayOfWeek]: Array<string>;
  };
}

export async function getTeacherSettingTimeByToken(
  params: TeacherSettingTimeByTokenParams,
): Promise<TeacherSettingTimeByTokenResponse> {
  const { token } = params;

  const res = await httpService.get<TeacherSettingTimeByTokenResponse>(
    `/teacher/token/info/available?token=${token}`,
  );

  return res.data;
}
