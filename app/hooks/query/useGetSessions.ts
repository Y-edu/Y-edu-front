import { useQuery } from "@tanstack/react-query";

import { getSessions } from "@/actions/post-getSessions";

export function useGetSessions(token: string) {
  return useQuery({
    queryKey: ["sessions", token],
    queryFn: async () => {
      const res = await getSessions(token);
      return res;
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 30,
    throwOnError: true,
  });
}
