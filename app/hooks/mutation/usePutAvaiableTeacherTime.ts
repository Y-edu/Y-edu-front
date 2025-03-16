import { useMutation } from "@tanstack/react-query";

import { putTeacherAvaiable } from "@/actions/put-teacher-avaiable";

export function useUpdateTeacherAvaiable() {
  return useMutation({
    mutationFn: putTeacherAvaiable,
  });
}
