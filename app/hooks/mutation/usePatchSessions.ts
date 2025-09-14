"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  patchSessionCancel,
  patchSessionChange,
  patchSessionComplete,
  patchSessionRevertCancel,
  CancelReason,
} from "@/actions/patch-sessions";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";
import { useGlobalModal } from "@/providers/GlobalModal";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { getSchedules } from "@/actions/get-schedules";

interface CompleteSessionVariables {
  token: string;
  classSessionId: string;
  classMinute: number;
  homework: string;
  understanding: string;
  date: string;
}

export function useSessionMutations() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const toast = useGlobalSnackbar();
  const modal = useGlobalModal();

  const changeMutation = useMutation({
    mutationFn: patchSessionChange,
    onSuccess: () => {
      toast.success("과외날짜가 변경되었어요.");
    },
    onError: (error) => {
      toast.warning(getErrorMessage(error));
    },
    meta: {
      invalidates: [["sessions"]],
    },
  });

  const cancelMutation = useMutation({
    mutationFn: ({
      sessionId,
      reason,
      isTodayCancel,
    }: {
      sessionId: number;
      reason: CancelReason;
      isTodayCancel: boolean;
    }) => patchSessionCancel({ sessionId, reason, isTodayCancel }),
    onSuccess: async (data, variables) => {
      toast.success("휴강 처리 됐어요");

      if (variables.isTodayCancel) {
        if (variables.reason === "PARENT") {
          // PARENT 사유일 때는 completeMutation과 동일하게 is-complete 페이지로 이동
          const params = new URLSearchParams(searchParams.toString());
          params.delete("sessionId");

          const token = searchParams.get("token") ?? "";

          let classId = searchParams.get("classId");
          if (!classId && token) {
            try {
              const schedules = await getSchedules({ token });
              const active = schedules.find((item) => item.send);
              if (active?.applicationFormId) {
                classId = active.applicationFormId;
              }
            } catch {
              // 실패해도 무시
            }
          }
          if (classId) {
            params.set("classId", classId);
          }

          await queryClient.refetchQueries({ queryKey: ["sessions"] });
          await queryClient.invalidateQueries({ queryKey: ["sessions-month"] });

          params.set("is-complete", "true");
          router.push(`/teacher/session-schedule?${params.toString()}`);

          // 페이지 이동 후 모달 표시
          setTimeout(() => {
            modal.showParentsModal();
          }, 500);
        }
        if (variables.reason === "TEACHER") {
          modal.showTeacherModal();
        }
      }
    },
    onError: (error) => {
      toast.warning(getErrorMessage(error));
    },
    meta: {
      invalidates: [["sessions"]],
    },
  });

  const revertMutation = useMutation({
    mutationFn: patchSessionRevertCancel,
    onSuccess: () => {
      toast.success("휴강이 취소됐어요");
    },
    onError: (error) => {
      toast.warning(getErrorMessage(error));
    },
    meta: {
      invalidates: [["sessions"]],
    },
  });

  const completeMutation = useMutation({
    mutationFn: patchSessionComplete,
    onSuccess: async (_data, variables: CompleteSessionVariables) => {
      const { token, classSessionId, date } = variables;
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

      let classId = searchParams.get("classId");
      if (!classId && token) {
        try {
          const schedules = await getSchedules({ token });
          const active = schedules.find((item) => item.send);
          if (active?.applicationFormId) {
            classId = active.applicationFormId;
          }
        } catch {
          // 실패해도 무시
        }
      }
      if (classId) {
        params.set("classId", classId);
      }

      await queryClient.refetchQueries({ queryKey: ["sessions"] });

      // sessions-month 쿼리도 무효화
      await queryClient.invalidateQueries({ queryKey: ["sessions-month"] });

      params.set("is-complete", "true");
      router.push(`/teacher/session-schedule?${params.toString()}`);

      toast.success(`${date} 과외가 완료되었어요`);
    },
    onError: (error) => {
      toast.warning(getErrorMessage(error));
    },
  });

  return {
    changeMutation,
    cancelMutation,
    revertMutation,
    completeMutation,
  };
}
