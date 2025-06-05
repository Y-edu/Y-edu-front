import { httpService } from "app/utils/httpService";

export interface SessionResponse {
  classSessionId: number;
  cancel: boolean;
  cancelReason: string | null;
  complete: boolean;
  understanding: string | null;
  homework: string | null;
  classDate: string;
  classStart: string;
  classMinute: number;
}

export interface SessionsResponse {
  schedules: Record<string, SessionResponse[]>;
}

export const getSessions = async (token: string): Promise<SessionsResponse> => {
  const { data } = await httpService.post<SessionsResponse>(
    `/sessions?token=${token}`,
    {},
  );
  return data;
};
