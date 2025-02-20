import { useSuspenseQuery } from "@tanstack/react-query";

import { getParentsRequest } from "@/actions/get-parents-request";

export function useGetParentsRequest(matchingId: string) {
  return useSuspenseQuery({
    queryKey: ["parents-request", matchingId],
    queryFn: async () => {
      const res = await getParentsRequest(matchingId);

      return res;
    },
  });
}
