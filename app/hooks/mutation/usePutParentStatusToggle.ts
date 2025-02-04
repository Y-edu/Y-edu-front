import { useMutation } from "@tanstack/react-query";

import { putParentStatusToggle } from "../../actions/put-parent-status-toggle";

export function usePutParentStatusToggle() {
  return useMutation({
    mutationFn: putParentStatusToggle,
  });
}
