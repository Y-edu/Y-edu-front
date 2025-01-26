import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchTeacherModal } from "../../actions/patch-teacherModal";

export function usePatchTeacherModal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTeacherModal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teachers"] });
    },
  });
}
