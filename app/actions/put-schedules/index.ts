import { httpService } from "@/utils/httpService";

export interface ScheduleDTO {
  day: string;
  start: string;
  classMinute: number;
}

export interface SchedulesRequestProps {
  token?: string;
  classMatchingId?: number;
  schedules: ScheduleDTO[];
  changeStartDate: string | undefined;
}

export interface SessionDTO {
  classSessionId: number;
  cancel: boolean;
  cancelReason: string | null;
  complete: boolean;
  understanding: string | null;
  homework: string | null;
  classDate: string;
  classStart: string;
}

export interface SchedulesResponse {
  schedules: Record<string, SessionDTO[]>;
}

export async function putSchedules(props: SchedulesRequestProps) {
  await httpService.put<SchedulesResponse>("/schedules", {
    ...props,
  });
}
