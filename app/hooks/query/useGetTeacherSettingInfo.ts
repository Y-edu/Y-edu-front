import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import {
  TeacherSettingInfoParams,
  TeacherSettingInfoResponse,
  getTeacherSettingInfo,
} from "@/actions/get-teacher-setting-info";

export function useGetTeacherSettingInfo(
  params: TeacherSettingInfoParams,
  options?: Omit<
    UseQueryOptions<TeacherSettingInfoResponse, Error>,
    "queryKey" | "queryFn"
  >,
) {
  return useQuery<TeacherSettingInfoResponse, Error>({
    queryKey: ["teacher-setting-info", params],
    queryFn: () => getTeacherSettingInfo(params),
    retry: 0,
    ...options,
  });
}
