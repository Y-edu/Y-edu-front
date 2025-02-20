import { useMutation } from "@tanstack/react-query";

import { patchTeacherVideo } from "@/actions/patch-teacher-video";

export function usePatchTeacherVideo() {
  return useMutation({
    mutationFn: patchTeacherVideo,
    meta: {
      invalidates: [["teacher-search"]],
    },
  });
}
