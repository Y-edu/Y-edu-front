import { useMutation } from "@tanstack/react-query";

import { putSchedule } from "@/actions/put-schedule";

export function usePutSchedule() {
  return useMutation({
    mutationFn: putSchedule,
  });
}
