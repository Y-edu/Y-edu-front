import { httpService } from "@/utils/httpService";

interface DeleteScheduleRequest {
  classScheduleManagementId: string;
  refuseReason: string;
}

export default async function deleteSchedule(req: DeleteScheduleRequest) {
  const { data } = await httpService.delete<void>("/matching/schedule", {
    data: req,
  });
  return data;
}
