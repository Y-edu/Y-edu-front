import { httpService } from "@/utils/httpService";

export interface SessionsMonthParams {
  token: string;
  classMatchingId: number;
  monthCount: number; // 몇 개의 월 데이터 가져올 건지 (디폴트: 2)
}

export interface SessionsMonthResponse {
  months: {
    [key: string]: number;
  };
}

export async function getSessionsMonth(params: SessionsMonthParams) {
  const { token, classMatchingId, monthCount } = params;

  const res = await httpService.get<SessionsMonthResponse>(
    `/sessions/month?token=${token}&classMatchingId=${classMatchingId}&monthCount=${monthCount}`,
  );

  return res.data;
}
