import { useMutation } from "@tanstack/react-query";

import { putTeacherAvailable } from "@/actions/put-teacher-available";

export function useUpdateTeacherAvailable() {
  return useMutation({
    mutationFn: putTeacherAvailable,
  });
}
