// 알림톡 테이블에서 과외건과 선생님을 매칭하는 mutation 훅
import { useMutation } from "@tanstack/react-query";

import { postMatchingSchedule } from "@/actions/post-matching-schedule";

export function usePostMatchingSchedule() {
  return useMutation({
    mutationFn: (vars: { classMatchingId: string; matchingId: string }) =>
      postMatchingSchedule({ classMatchingId: vars.classMatchingId }),
  });
}
