import { useQuery } from "@tanstack/react-query";

import {
  getSessionsMonth,
  SessionsMonthParams,
} from "@/actions/get-sessions-month";

export function useGetSessionsMonth(params: SessionsMonthParams) {
  return useQuery({
    queryKey: ["sessions-month", params],
    queryFn: async () => {
      const res = await getSessionsMonth(params);
      return res;
    },
    enabled: !!params.token || !!params.classMatchingId,
  });
}
