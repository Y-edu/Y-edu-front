// 학부모 과외 일시정지 / 선생님 교체 신청 mutation 훅

import { useMutation } from "@tanstack/react-query";

import {
  postParentsSessionActions,
  ParentsSessionActionsRequest,
} from "@/actions/post-parents-session-actions";

export function usePostParentsSessionActions() {
  return useMutation<
    void,
    Error,
    { phoneNumber: string } & ParentsSessionActionsRequest
  >({
    mutationFn: ({ phoneNumber, sessionId, type }) =>
      postParentsSessionActions(phoneNumber, { sessionId, type }),
  });
}
