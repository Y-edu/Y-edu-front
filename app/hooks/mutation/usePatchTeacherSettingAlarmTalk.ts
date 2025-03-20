import { useMutation } from "@tanstack/react-query";

import { patchTeacherSettingAlarmTalk } from "@/actions/patch-teacher-setting-alarmtalk";

export function usePatchTeacherSettingAlarmTalk() {
  return useMutation({
    mutationFn: patchTeacherSettingAlarmTalk,
    meta: {
      invalidates: [["teacher-setting-info"]],
    },
  });
}
