import { httpService } from "@/utils/httpService";

export interface UpdateDistrictParams {
  name: string;
  phoneNumber: string;
  districts: string[];
}

export interface TeacherSettingDistrictResponse {
  districts: string[];
}

export async function patchTeacherSettingRegion(
  params: UpdateDistrictParams,
): Promise<TeacherSettingDistrictResponse> {
  const res = await httpService.put<TeacherSettingDistrictResponse>(
    `/teacher/info/district`,
    params,
  );
  return res.data;
}
