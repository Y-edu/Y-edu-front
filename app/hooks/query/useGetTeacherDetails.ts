import { useQuery, useSuspenseQuery, useQueries } from "@tanstack/react-query";

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

export function useGetTeacherAllDetailsByTeacherId(
  params: TeacherDetailsParams,
) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["teacher-details-teacher", params],
        queryFn: () => getTeacherDetailsTeacher(params),
        retry: 0,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
      },
      {
        queryKey: ["teacher-details-class", params],
        queryFn: () => getTeacherDetailsClass(params),
        retry: 0,
        staleTime: Infinity,
        gcTime: Infinity,
      },
      {
        queryKey: ["teacher-details-available", params],
        queryFn: () =>
          getTeacherDetailsAvailable({ teacherId: params.teacherId }),
        retry: 0,
        staleTime: Infinity,
        gcTime: Infinity,
      },
      {
        queryKey: ["teacher-details-info", params],
        queryFn: () => getTeacherDetailsInfo({ teacherId: params.teacherId }),
        retry: 0,
        staleTime: 1000 * 60 * 60,
        gcTime: 1000 * 60 * 60 * 24,
      },
    ],
  });

  const [teacherDetails, classDetails, availableDetails, infoDetails] = results;

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);
  const error = results.find((result) => result.error)?.error;

  const data = {
    ...teacherDetails.data,
    ...classDetails.data,
    ...availableDetails.data,
    ...infoDetails.data?.data,
  };

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
