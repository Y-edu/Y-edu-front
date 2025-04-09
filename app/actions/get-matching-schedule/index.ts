import { httpService } from "app/utils/httpService";

export interface ClassSchedule {
  day: string;
  start: string;
  classMinute: number;
}

export interface FirstDay {
  date: string;
  start: string;
}

export interface MatchingScheduleResponse {
  exist: boolean;
  classMatchingId: string | null;
  classScheduleManagementId: string | null;
  textBook: string | null;
  schedules: ClassSchedule[] | null;
  firstDay: FirstDay | null;
}

export const getMatchingSchedule = async (params: {
  classScheduleManagementId?: string;
  classMatchingId?: string;
}): Promise<MatchingScheduleResponse> => {
  const response = await httpService.get<MatchingScheduleResponse>(
    "/matching/schedule",
    { params },
  );
  if (response.status === 204) {
    return {
      exist: false,
      classMatchingId: null,
      classScheduleManagementId: null,
      textBook: null,
      schedules: null,
      firstDay: null,
    };
  }
  return response.data;
};
