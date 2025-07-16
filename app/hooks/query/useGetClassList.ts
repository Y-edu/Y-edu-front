import { QueryHookOptions, useMutation, useQuery } from "@apollo/client";

import {
  GET_CLASS_DETAIL,
  GET_CLASSLIST,
  PUT_CLASS_STATUS,
} from "@/actions/graphql/class-management";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";

export const CLASS_STATUS_OPTIONS = ["최종매칭", "중단", "일시중단"] as const;

export type ClassStatus = (typeof CLASS_STATUS_OPTIONS)[number];

interface Variables {
  matchingStatus?: string[];
  matchingIds?: number[] | null;
}
export interface Class {
  applicationFormId: string;
  subject: string;
  matchingStatus: ClassStatus;
  matchingId: number;
  classManagement: {
    schedule: {
      classScheduleId: number;
      day: string;
      start: string;
      classMinute: number;
    }[];
  };
  parent: {
    kakaoName: string;
    phoneNumber: string;
  };
  teacher: {
    nickName: string;
    phoneNumber: string;
  };
}

export interface GetClassListResponse {
  applicationFormByMatchingId: Class[];
}

export interface ClassDetail {
  classManagement: {
    firstDay: string;
    schedule: {
      classScheduleId: number;
      day: string;
      start: string;
      classMinute: number;
    }[];
  };
  teacher: {
    phoneNumber: string;
  };
  parent: {
    phoneNumber: string;
  };
}

export interface GetClassDetailResponse {
  applicationFormByMatchingId: ClassDetail[];
}

export const useGetClassList = (
  variables: Variables,
  options?: QueryHookOptions<GetClassListResponse, Variables>,
) => {
  return useQuery<GetClassListResponse, Variables>(GET_CLASSLIST, {
    variables,
    skip: !variables.matchingStatus,
    ...options,
  });
};

export const useGetClassDetail = (variables: Variables) => {
  return useQuery<GetClassDetailResponse>(GET_CLASS_DETAIL, {
    variables,
    skip: !variables.matchingIds,
  });
};

export const usePutClassStatus = () => {
  const { refetch } = useGetClassList({
    matchingStatus: ["최종매칭", "중단", "일시중단"],
  });
  const toast = useGlobalSnackbar();
  const [mutate, mutationResult] = useMutation(PUT_CLASS_STATUS, {
    onCompleted: () => {
      refetch();
    },
    onError: () => {
      toast.warning("다시 시도해주세요.");
    },
  });

  return { mutate, ...mutationResult };
};
