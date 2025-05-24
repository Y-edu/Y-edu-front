import { useQuery } from "@tanstack/react-query";

import { getSessionByToken } from "@/actions/get-session-by-token";

export function useGetSessionByToken({ token }: { token: string }) {
  return useQuery({
    queryKey: ["session", token],
    queryFn: () => getSessionByToken({ token }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
