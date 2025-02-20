import { useMutation } from "@tanstack/react-query";

import { patchTeacherIssue } from "@/actions/patch-teacher-Issue";

export function usePatchTeacherIssue() {
  return useMutation({
    mutationFn: patchTeacherIssue,
    meta: {
      invalidates: [["teacher-search"]],
    },
  });
}
