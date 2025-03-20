import { useMutation } from "@tanstack/react-query";

import { patchTeacherSettingRegion } from "@/actions/patch-teacher-setting-region";

export function usePatchTeacherSettingRegion() {
  return useMutation({
    mutationFn: patchTeacherSettingRegion,
    meta: {
      invalidates: [["teacher-setting-info"]],
    },
  });
}
