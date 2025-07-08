import { httpService } from "app/utils/httpService";

export interface SessionResponse {
  classSessionId: number;
  cancel: boolean;
  cancelReason: string | null;
  complete: boolean;
  understanding: string | null;
  homework: string | null;
  classDate: string;
  classStart: string;
  classMinute: number;
}

export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface SchedulePageInfo {
  content: SessionResponse[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortInfo;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface SessionScheduleInfo {
  schedules: SchedulePageInfo;
  send: boolean;
}

export interface SessionsResponse {
  schedules: Record<string, SessionScheduleInfo>;
}

export const getSessions = async (
  token: string,
  page: number,
  size: number,
  isComplete?: boolean,
): Promise<SessionsResponse> => {
  const { data } = await httpService.post<SessionsResponse>("/sessions", null, {
    params: {
      token,
      page,
      size,
      ...(isComplete !== undefined && { isComplete }),
    },
  });

  return data;
};
