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

  const res = await httpService.get<SessionsMonthResponse>("/sessions/month", {
    params: {
      monthCount,
      ...(params.token && { token: params.token }),
      ...(params.classMatchingId && {
        classMatchingId: params.classMatchingId,
      }),
    },
  });

  return res.data;
}
