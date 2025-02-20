import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import {
  TeacherDetailsParams,
  TeacherSimpleDetailsParams,
  getTeacherDetailsAvailable,
  getTeacherDetailsClass,
  getTeacherDetailsInfo,
  getTeacherDetailsTeacher,
} from "@/actions/get-teacher-detail";

export function useGetTeacherDetailsTeacher(params: TeacherDetailsParams) {
  return useQuery({
    queryKey: ["teacher-details-teacher", params],
    queryFn: () => {
      const res = getTeacherDetailsTeacher(params);
      return res;
    },
    retry: 0,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}

export function useGetTeacherDetailsClass(params: TeacherDetailsParams) {
  return useSuspenseQuery({
    queryKey: ["teacher-details-class", params],
    queryFn: () => {
      const res = getTeacherDetailsClass(params);
      return res;
    },
    retry: 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useGetTeacherDetailsAvailable(
  params: TeacherSimpleDetailsParams,
) {
  return useSuspenseQuery({
    queryKey: ["teacher-details-available", params],
    queryFn: () => {
      const res = getTeacherDetailsAvailable(params);
      return res;
    },
    retry: 0,
    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useGetTeacherDetailsInfo(params: TeacherSimpleDetailsParams) {
  return useQuery({
    queryKey: ["teacher-details-info", params],
    queryFn: () => {
      const res = getTeacherDetailsInfo(params);
      return res;
    },
    retry: 0,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60 * 24,
  });
}
