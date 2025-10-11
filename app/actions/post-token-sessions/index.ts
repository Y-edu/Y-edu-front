import { httpService } from "@/utils/httpService";

export interface TeacherSessionScheduleLoginParams {
  name: string;
  phoneNumber: string;
}

export interface TeacherSessionScheduleLoginResponse {
  token: string;
}

export async function postTokenSessions(
  params: TeacherSessionScheduleLoginParams,
): Promise<TeacherSessionScheduleLoginResponse> {
  const { name, phoneNumber } = params;
  const res = await httpService.post<TeacherSessionScheduleLoginResponse>(
    `/token/sessions?${new URLSearchParams({ name, phoneNumber }).toString()}`,
    {}, // 빈 body
  );

  return res.data;
}
