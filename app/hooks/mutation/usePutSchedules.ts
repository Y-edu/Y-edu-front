import { useMutation } from "@tanstack/react-query";

import { putSchedules } from "@/actions/put-schedules";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";

export function usePutSchedules() {
  const toast = useGlobalSnackbar();

  return useMutation({
    mutationFn: putSchedules,
    onSuccess: () => {
      toast.success("정규 일정이 변경되었어요.");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        alert("스케줄 등록 중 문제가 발생했어요. 다시 시도해주세요.");
      } else {
        alert("오류가 발생했어요.");
      }
    },
    meta: {
      invalidates: [["schedules"], ["sessions"]],
    },
  });
}
