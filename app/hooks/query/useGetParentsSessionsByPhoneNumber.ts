import { useQuery } from "@tanstack/react-query";

import {
  getParentsSessionsByPhoneNumber,
  ParentsSessionsResponse,
} from "@/actions/get-parents-sessions";

export function useGetParentsSessionsByPhone(phoneNumber: string) {
  return useQuery<ParentsSessionsResponse>({
    queryKey: ["sessions-by-phone", phoneNumber],
    queryFn: () => getParentsSessionsByPhoneNumber(phoneNumber),
    enabled: !!phoneNumber,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
