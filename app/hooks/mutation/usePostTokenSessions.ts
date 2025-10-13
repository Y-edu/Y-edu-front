import { useMutation } from "@tanstack/react-query";

import { postTokenSessions } from "@/actions/post-token-sessions";

export function usePostTokenSessions() {
  return useMutation({
    mutationFn: postTokenSessions,
  });
}
