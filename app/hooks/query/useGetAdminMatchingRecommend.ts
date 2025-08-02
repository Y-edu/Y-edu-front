import { useQuery } from "@tanstack/react-query";

import { getAdminMatchingRecommend } from "app/actions/get-admin-details-matching-recommend";

export function useGetAdminMatchingRecommend(classMatchingId: string | null) {
  return useQuery({
    queryKey: ["admin-matching-recommend", classMatchingId],
    queryFn: () =>
      getAdminMatchingRecommend({ classMatchingId: classMatchingId! }),
    enabled: !!classMatchingId, // classMatchingId가 있을 때만 쿼리 실행
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
