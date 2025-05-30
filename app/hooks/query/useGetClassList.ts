import { QueryHookOptions, useMutation, useQuery } from "@apollo/client";

import {
  GET_CLASS_DETAIL,
  GET_CLASSLIST,
  PUT_CLASS_STATUS,
} from "@/actions/graphql/class-management";

export type ClassStatus = "수업중" | "중단" | "임시중단";

interface Variables {
  matchingStatus?: string[];
  matchingIds?: number[] | null;
}
export interface Class {
  applicationFormId: string;
  subject: string;
  matchingStatus: ClassStatus;
  matchingId: number;
  parent: {
    kakaoName: string;
  };
  teacher: {
    nickName: string;
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
  const [mutate, mutationResult] = useMutation(PUT_CLASS_STATUS);

  return { mutate, ...mutationResult };
};
