import { useQuery } from "@tanstack/react-query";

import {
  TeacherSettingInfoParams,
  getTeacherSettingInfo,
} from "@/actions/get-teacher-setting-info";

export function useGetTeacherSettingInfo(params: TeacherSettingInfoParams) {
  return useQuery({
    queryKey: ["teacher-setting-info", params],
    queryFn: () => {
      const res = getTeacherSettingInfo(params);
      return res;
    },
  });
}
