import { useSuspenseQuery } from "@tanstack/react-query";

import { getParentsRequest } from "../../actions/get-parents-request";

export function useGetParentsRequest(macthingId: string) {
  return useSuspenseQuery({
    queryKey: ["parents-request", macthingId],
    queryFn: async () => {
      const res = await getParentsRequest(macthingId);

      return res;
    },
  });
}
