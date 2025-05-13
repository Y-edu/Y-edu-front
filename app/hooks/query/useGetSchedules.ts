import { useQuery } from "@tanstack/react-query";

import { getSchedules } from "@/actions/get-schedules";

export function useGetSchedules({ token }: { token: string }) {
  return useQuery({
    queryKey: ["schedules", token],
    queryFn: () => getSchedules({ token }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
