// 알림톡 발송 요청을 보내는 mutation
import { useMutation } from "@tanstack/react-query";

import { postMatchingAcceptance } from "../../actions/post-acceptance";

export function usePostMatchingAcceptance() {
  return useMutation({
    mutationFn: postMatchingAcceptance,
  });
}
