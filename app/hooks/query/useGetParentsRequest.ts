import { useQuery } from "@tanstack/react-query";
import { getParentsRequest } from "../../actions/get-parents-request";

export function useGetParentsRequest(macthingId: string) {
  return useQuery({
    queryKey: ["parents-request", macthingId],
    queryFn: () => getParentsRequest(macthingId),
  });
}
