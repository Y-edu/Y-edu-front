import { useMutation } from "@tanstack/react-query";

import { postTutoringAccept } from "@/actions/post-tutoring-accept";

export function usePostTutoringAccept() {
  return useMutation<
    string,
    Error,
    {
      token: string;
      available: Record<string, string[]>;
    }
  >({
    mutationFn: postTutoringAccept,
  });
}
