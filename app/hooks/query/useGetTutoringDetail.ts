import { useSuspenseQuery } from "@tanstack/react-query";

import { getTutoring } from "../../actions/get-tutoring";

export function useGetTutoring({
  teacherId,
  matchingId,
}: {
  teacherId: string;
  matchingId: string;
}) {
  return useSuspenseQuery({
    queryKey: ["tutoring"],
    queryFn: () => getTutoring({ teacherId, matchingId }),
    staleTime: Infinity,
  });
}
