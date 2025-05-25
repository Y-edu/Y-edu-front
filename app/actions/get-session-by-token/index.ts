import { httpService } from "@/utils/httpService";

export interface SessionByTokenResponse {
  sessionDate: string;
  isComplete: boolean;
  teacherId: number;
  classTime: {
    start: string;
    classMinute: number;
  };
}

export async function getSessionByToken({
  token,
}: {
  token: string;
}): Promise<SessionByTokenResponse> {
  const res = await httpService.get<SessionByTokenResponse>(
    `/token/sessions?token=${token}`,
  );

  return res.data;
}
