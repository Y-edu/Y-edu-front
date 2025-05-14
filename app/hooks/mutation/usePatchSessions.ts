import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  patchSessionCancel,
  patchSessionChange,
  patchSessionRevertCancel,
} from "@/actions/patch-sessions";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";

export function useSessionMutations() {
  const queryClient = useQueryClient();
  const toast = useGlobalSnackbar();

  const changeMutation = useMutation({
    mutationFn: patchSessionChange,
    onSuccess: () => {
      toast.success("과외날짜가 변경되었어요.");
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "sessions",
      });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: patchSessionCancel,
    onSuccess: () => {
      toast.success("휴강 처리 됐어요");
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "sessions",
      });
    },
  });

  const revertMutation = useMutation({
    mutationFn: patchSessionRevertCancel,
    onSuccess: () => {
      toast.success("휴강이 취소됐어요");
      queryClient.invalidateQueries({
        predicate: (q) => q.queryKey[0] === "sessions",
      });
    },
  });

  return {
    changeMutation,
    cancelMutation,
    revertMutation,
  };
}
