import { httpService } from "@/utils/httpService";

export function patchSessionChange({
  sessionId,
  sessionDate,
  start,
}: {
  sessionId: number;
  sessionDate: string;
  start: string;
}) {
  return httpService.patch(`/sessions/${sessionId}/change`, {
    sessionDate,
    start,
  });
}

export function patchSessionCancel({
  sessionId,
  reason,
}: {
  sessionId: number;
  reason: string;
}) {
  return httpService.patch(
    `/sessions/${sessionId}/cancel?cancelReason=${reason}`,
  );
}

export function patchSessionRevertCancel({ sessionId }: { sessionId: number }) {
  return httpService.patch(`/sessions/${sessionId}/revert-cancel`);
}

export function patchSessionComplete({
  token,
  classSessionId,
  classMinute,
  understanding,
  homework,
}: {
  token?: string;
  classSessionId?: string;
  classMinute: number;
  understanding: string;
  homework: string;
}) {
  if (classSessionId) {
    return httpService.patch(`/sessions/${classSessionId}/complete`, {
      classSessionId,
      classMinute,
      understanding,
      homework,
    });
  }
  return httpService.patch("/token/sessions/complete", {
    token,
    classMinute,
    understanding,
    homework,
  });
}
