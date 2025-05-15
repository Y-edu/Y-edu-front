import { httpService } from "@/utils/httpService";

export async function getSessionByToken({ token }: { token: string }) {
  const res = await httpService.get<string>(`/token/sessions?token=${token}`);

  return res.data;
}
