import { httpService } from "@/utils/httpService";

import { DayOfWeek } from "../get-teacher-detail";

export interface ClassTimeDTO {
  start: string;
  classMinute: number;
}

export interface SchedulesResponse {
  schedules: Partial<Record<DayOfWeek, ClassTimeDTO[]>>;
}

export async function getSchedules({ token }: { token: string }) {
  const res = await httpService.get<SchedulesResponse>(
    `/schedules?token=${token}`,
  );

  return res.data;
}
