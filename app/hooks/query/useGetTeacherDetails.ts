import { useQuery } from "@tanstack/react-query";
import {
  TeacherDetailsParams,
  getTeacherDetailsTeacher,
} from "../../actions/get-teacher-detail";

export function useGetTeacherDetailsTeacher(params: TeacherDetailsParams) {
  return useQuery({
    queryKey: ["teacher-details-teacher", params],
    queryFn: () => {
      const res = getTeacherDetailsTeacher(params);

      return res;
    },
  });
}
