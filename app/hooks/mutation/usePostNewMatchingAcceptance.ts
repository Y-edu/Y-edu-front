// 알림톡 발송 재요청을 보내는 mutation
import { useMutation } from "@tanstack/react-query";

import { postNewMatchingAcceptance } from "../../actions/post-new-acceptance";

export function usePostNewMatchingAcceptance() {
  return useMutation({
    mutationFn: postNewMatchingAcceptance,
  });
}
