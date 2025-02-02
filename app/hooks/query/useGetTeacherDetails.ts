import { useQuery } from "@tanstack/react-query";
import {
  TeacherDetailsParams,
  getTeacherDetailsClass,
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

export function useGetTeacherDetailsClass(params: TeacherDetailsParams) {
  return useQuery({
    queryKey: ["teacher-details-class", params],
    queryFn: () => {
      const res = getTeacherDetailsClass(params);
      return res;
    },
  });
}
