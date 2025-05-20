"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  patchSessionCancel,
  patchSessionChange,
  patchSessionComplete,
  patchSessionRevertCancel,
} from "@/actions/patch-sessions";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";

interface CompleteSessionVariables {
  token: string;
  classSessionId: string;
  homeworkPercentage: number;
  understanding: string;
  date: string;
}

export function useSessionMutations() {
  const router = useRouter();
  const searchParams = useSearchParams();
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

  const completeMutation = useMutation({
    mutationFn: patchSessionComplete,
    onSuccess: async (_data, variables: CompleteSessionVariables) => {
      const { token, classSessionId } = variables;
      if (token) {
        await queryClient.invalidateQueries({
          queryKey: ["schedules", token],
        });
      }
      if (classSessionId) {
        await queryClient.invalidateQueries({
          queryKey: ["schedules", classSessionId],
        });
      }
      const params = new URLSearchParams(searchParams.toString());
      params.delete("sessionId");
      router.push(`/teacher/session-schedule?${params.toString()}`);
      toast.success(`${variables.date} 과외가 완료되었어요`);
    },
  });

  return {
    changeMutation,
    cancelMutation,
    revertMutation,
    completeMutation,
  };
}
