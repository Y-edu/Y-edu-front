import { useMutation } from "@tanstack/react-query";

import { patchTeacherModal } from "../../actions/patch-teacherModal";

export function usePatchTeacherModal() {
  return useMutation({
    mutationFn: patchTeacherModal,
    meta: {
      invalidates: [["teachers"]],
    },
  });
}
