import { httpService } from "@/utils/httpService";
import { DayOfWeek } from "@/actions/get-teacher-detail";

export interface ClassTimeDTO {
  start: string;
  classMinute: number;
}

export interface ScheduleItem {
  applicationFormId: string;
  classMatchingId: number;
  send: boolean;
  schedules: Partial<Record<DayOfWeek, ClassTimeDTO[]>>;
}

export type SchedulesResponse = ScheduleItem[];

export async function getSchedules({ token }: { token: string }) {
  const res = await httpService.get<SchedulesResponse>(
    `/schedules?token=${token}`,
  );

  return res.data;
}
