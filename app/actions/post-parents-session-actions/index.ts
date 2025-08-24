import { httpService } from "@/utils/httpService";

export type SessionActionsType = "PAUSE" | "CHANGE_TEACHER";

export interface ParentsSessionActionsRequest {
  sessionId: number;
  type: SessionActionsType;
}

export async function postParentsSessionActions(
  phoneNumber: string,
  payload: ParentsSessionActionsRequest,
): Promise<void> {
  await httpService.post(
    `/parents/${phoneNumber}/sessions/change-form`,
    payload,
    {
      validateStatus: (status) =>
        status === 204 || (status >= 200 && status < 300),
    },
  );
}
