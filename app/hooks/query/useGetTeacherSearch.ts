import { useQuery } from "@tanstack/react-query";

import {
  getTeacherSearch,
  TeacherSearchParams,
  TeacherSearchResponse,
} from "../../actions/get-teacher-search";

export function useGetTeacherSearch(params: TeacherSearchParams) {
  return useQuery<TeacherSearchResponse>({
    queryKey: ["teacher-search", params],
    queryFn: () => getTeacherSearch(params),
  });
}
