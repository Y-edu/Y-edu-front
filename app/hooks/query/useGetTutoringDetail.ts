import { useSuspenseQuery } from "@tanstack/react-query";

import { getTutoring } from "@/actions/get-tutoring";

export function useGetTutoring({
  teacherId,
  applcationFormId,
  phoneNumber,
}: {
  teacherId: string;
  applcationFormId: string;
  phoneNumber: string;
}) {
  return useSuspenseQuery({
    queryKey: ["tutoring"],
    queryFn: () => getTutoring({ teacherId, applcationFormId, phoneNumber }),
    staleTime: Infinity,
    retry: 0,
  });
}
