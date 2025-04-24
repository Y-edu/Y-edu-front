import { useQuery } from "@tanstack/react-query";

import {
  getTeacherAllDetails,
  TeacherTokenParams,
} from "@/actions/get-teacher-all-detail";

export function useGetTeacherAllDetails(params: TeacherTokenParams) {
  return useQuery({
    queryKey: ["teacher-all-details", params.token],
    queryFn: async () => {
      const res = await getTeacherAllDetails(params);
      return res;
    },
    retry: 0,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
