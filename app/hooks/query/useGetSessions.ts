import { useQuery } from "@tanstack/react-query";

import { getSessions } from "@/actions/post-getSessions";

export function useGetSessions(
  token: string,
  page: number = 0,
  size: number = 3,
  isComplete: boolean = false,
  classId?: string,
) {
  return useQuery({
    queryKey: ["sessions", token, page, size, isComplete, classId],
    queryFn: async () => {
      const res = await getSessions(token, page, size, isComplete);
      return res;
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
    throwOnError: true,
  });
}
