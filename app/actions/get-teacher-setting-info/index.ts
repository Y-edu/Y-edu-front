import { httpService } from "@/utils/httpService";

export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export interface TeacherSettingInfoParams {
  name: string;
  phoneNumber: string;
}

export interface TeacherSettingInfoResponse {
  name: string;
  alarmTalk: boolean;
  districts: Array<string>;
  available: {
    [key in DayOfWeek]: Array<string>;
  };
}

export async function getTeacherSettingInfo(
  params: TeacherSettingInfoParams,
): Promise<TeacherSettingInfoResponse> {
  const { name, phoneNumber } = params;

  const res = await httpService.get<TeacherSettingInfoResponse>(
    `/teacher/info/${name}/${phoneNumber}`,
  );
  return res.data;
}
