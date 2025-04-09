import { useSuspenseQuery } from "@tanstack/react-query";

import { getMatchingSchedule } from "@/actions/get-matching-schedule";
import type { MatchingScheduleResponse } from "@/actions/get-matching-schedule";

export function useGetMatchingSchedule(params: {
  classScheduleManagementId?: string;
  classMatchingId?: string;
}) {
  return useSuspenseQuery<MatchingScheduleResponse>({
    queryKey: ["matchingSchedule", params],
    queryFn: () => getMatchingSchedule(params),
  });
}
