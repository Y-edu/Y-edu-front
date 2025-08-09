import { httpService } from "@/utils/httpService";

export interface Session {
  sessionId: number;
  sessionDate: string;
  roundNumber: number;
}

export interface ParentsSessionItem {
  applicationFormId: string;
  teacherNickname: string;
  sessions: Session[];
}

export type ParentsSessionsResponse = ParentsSessionItem[];

export async function getParentsSessionsByPhoneNumber(phoneNumber: string) {
  const res = await httpService.get<ParentsSessionsResponse>(
    `/parents/${phoneNumber}/sessions`,
  );
  return res.data;
}
