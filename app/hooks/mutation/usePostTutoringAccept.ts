import { useMutation } from "@tanstack/react-query";

import { postTutoringAccept } from "../../actions/post-tutoring-accept";

export function usePostTutoringAccept() {
  return useMutation({
    mutationFn: postTutoringAccept,
  });
}
