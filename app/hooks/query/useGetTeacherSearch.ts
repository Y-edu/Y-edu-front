import { useQuery } from "@tanstack/react-query";

import {
  getTeacherSearch,
  TeacherSearchParams,
  TeacherSearchResponse,
} from "@/actions/get-teacher-search";

export function useGetTeacherSearch(
  applicationFormId: string,
  params: TeacherSearchParams,
) {
  return useQuery<TeacherSearchResponse>({
    queryKey: ["teacher-search", applicationFormId, params],
    queryFn: () => getTeacherSearch(applicationFormId, params),
  });
}
