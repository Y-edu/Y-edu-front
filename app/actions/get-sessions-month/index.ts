import { httpService } from "@/utils/httpService";

// token이나 classMatchingId 둘 중 하나는 있어야 함
export type SessionsMonthParams =
  | {
      token: string;
      classMatchingId?: never; // token이 있을 때는 classMatchingId 금지
      monthCount: number;
    }
  | {
      classMatchingId: number;
      token?: never; // classMatchingId가 있을 때는 token 금지
      monthCount: number;
    };

export interface SessionsMonthResponse {
  months: {
    [key: string]: number;
  };
}

export async function getSessionsMonth(params: SessionsMonthParams) {
  const { monthCount } = params;

  // 공통 쿼리 파라미터
  let query = `monthCount=${monthCount}`;

  if ("token" in params) {
    query += `&token=${params.token}`;
  }

  if ("classMatchingId" in params) {
    query += `&classMatchingId=${params.classMatchingId}`;
  }

  const res = await httpService.get<SessionsMonthResponse>(
    `/sessions/month?${query}`,
  );

  return res.data;
}
