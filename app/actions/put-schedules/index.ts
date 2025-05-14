import { httpService } from "@/utils/httpService";

export interface ScheduleDTO {
  day: string;
  start: string;
  classMinute: number;
}

export interface SchedulesRequestProps {
  token: string;
  schedules: ScheduleDTO[];
}

export interface SessionDTO {
  classSessionId: number;
  cancel: boolean;
  cancelReason: string | null;
  complete: boolean;
  understanding: string | null;
  homeworkPercentage: number | null;
  classDate: string;
  classStart: string;
}

export interface SchedulesResponse {
  schedules: Record<string, SessionDTO[]>;
}

export async function putSchedules(props: SchedulesRequestProps) {
  const { token, schedules } = props;

  await httpService.put<SchedulesResponse>("/schedules", {
    token,
    schedules,
  });
}
