import { useMutation } from "@tanstack/react-query";

import { putSchedules } from "@/actions/put-schedules";

export function usePutSchedules() {
  return useMutation({
    mutationFn: putSchedules,
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert("스케줄 등록 중 문제가 발생했어요. 다시 시도해주세요.");
      } else {
        alert("오류가 발생했어요.");
      }
    },
  });
}
