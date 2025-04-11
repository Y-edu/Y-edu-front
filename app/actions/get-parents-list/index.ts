import { httpService } from "app/utils/httpService";

export interface ScheduledClass {
  day: string;
  startTime: string;
  classTime: number;
}

export interface ParentsListResponse {
  applicationFormId: string;
  kakaoName: string | null;
  classCount: string;
  classTime: string;
  scheduledClasses?: ScheduledClass[];
  pay: number;
  wantedSubject: string;
  source: string;
  createdAt: string;
  accept: number;
  total: number;
  phoneNumber: string;
  status: boolean;
}

export interface AdminMatchingResponse {
  applicationResponses: ParentsListResponse[];
}

export const getParentsList = async (): Promise<AdminMatchingResponse> => {
  const { data } = await httpService.get<AdminMatchingResponse>(
    "/admin/all/matching",
  );
  return data;
};
