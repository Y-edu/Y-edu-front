import { httpService } from "@/utils/httpService";

export type SessionActionsType = "PAUSE" | "CHANGE_TEACHER";

export interface SessionSubmitState {
  PAUSE: boolean;
  CHANGE_TEACHER: boolean;
}

export interface Session {
  sessionId: number;
  sessionDate: string;
  roundNumber: number;
  isSubmit?: SessionSubmitState;
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
