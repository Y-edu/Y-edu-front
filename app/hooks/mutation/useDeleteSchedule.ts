import { useMutation } from "@tanstack/react-query";

import deleteSchedule from "@/actions/delete-schedule";

export function useDeleteSchedule() {
  return useMutation({
    mutationFn: deleteSchedule,
    onError: (error) => {
      alert(`전송에 실패하였습니다. 오류: ${error}`);
    },
  });
}
