import { useQuery } from "@tanstack/react-query";

import { getTeacherSettingTimeByToken } from "@/actions/get-teacher-setting-time-by-token";

export function useGetTeacherSettingTimeByToken({ token }: { token: string }) {
  return useQuery({
    queryKey: ["teacher-setting-time", token],
    queryFn: () => getTeacherSettingTimeByToken({ token }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
    enabled: !!token,
  });
}
