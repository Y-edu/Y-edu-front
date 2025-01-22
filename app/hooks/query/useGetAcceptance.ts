import { useSuspenseQuery } from "@tanstack/react-query";
import { getAcceptance } from "../../actions/get-acceptance";

export function useGetAcceptance(matchingId: string) {
  return useSuspenseQuery({
    queryKey: ["acceptance", matchingId],
    queryFn: () => getAcceptance(matchingId),
  });
}
