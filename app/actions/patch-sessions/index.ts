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
