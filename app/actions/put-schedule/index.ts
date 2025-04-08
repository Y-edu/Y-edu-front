import { httpService } from "@/utils/httpService";

export interface ScheduleDTO {
  day: string;
  start: string;
  classMinute: number;
}

export interface FirstDayDTO {
  date: string;
  start: string;
  classMinute: number;
}

export interface ScheduleRequest {
  classScheduleManagementId: string;
  textBook: string;
  schedules: ScheduleDTO[];
  firstDay: FirstDayDTO;
}
export async function putSchedule(req: ScheduleRequest) {
  await httpService.put<void>("/matching/schedule", req);
}
