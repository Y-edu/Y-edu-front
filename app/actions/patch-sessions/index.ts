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
  homeworkPercentage,
}: {
  token?: string;
  classSessionId?: string;
  classMinute: number;
  understanding: string;
  homeworkPercentage: number;
}) {
  if (classSessionId) {
    return httpService.patch(`/sessions/${classSessionId}/complete`, {
      classSessionId,
      classMinute,
      understanding,
      homeworkPercentage,
    });
  }
  return httpService.patch("/token/sessions/complete", {
    token,
    classMinute,
    understanding,
    homeworkPercentage,
  });
}
