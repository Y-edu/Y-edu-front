import { useSuspenseQuery } from "@tanstack/react-query";

import { getTutoring } from "@/actions/get-tutoring";

export function useGetTutoring({ token }: { token: string }) {
  return useSuspenseQuery({
    queryKey: ["tutoring", token],
    queryFn: () => getTutoring({ token }),
    staleTime: 0,
    refetchOnMount: true,
    retry: 0,
  });
}
