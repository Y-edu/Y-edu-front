import { useMutation } from "@tanstack/react-query";

import { postTutoringRefuse } from "../../actions/post-tutoring-refuse";

export function usePostTutoringRefuse() {
  return useMutation({
    mutationFn: postTutoringRefuse,
  });
}
