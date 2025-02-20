import { useSuspenseQuery } from "@tanstack/react-query";

import { getMatching } from "@/actions/get-matching";

export function useGetMatchingInfo(matchingId: string) {
  return useSuspenseQuery({
    queryKey: ["matching", matchingId],
    queryFn: () => getMatching(matchingId),
  });
}
