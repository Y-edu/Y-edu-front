import { httpService } from "@/utils/httpService";

export interface UpdateAlarmTalkParams {
  name: string;
  phoneNumber: string;
  alarmTalk: boolean;
}

export interface TeacherSettingAlarmTalkResponse {
  alarmTalk: boolean;
}

export async function patchTeacherSettingAlarmTalk(
  params: UpdateAlarmTalkParams,
): Promise<TeacherSettingAlarmTalkResponse> {
  const res = await httpService.put<TeacherSettingAlarmTalkResponse>(
    `/teacher/info/active/talk`,
    params,
  );
  return res.data;
}
