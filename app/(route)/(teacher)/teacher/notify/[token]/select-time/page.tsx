"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

import ErrorUI from "@/ui/ErrorUI";
import { TeacherSettingTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import { usePostTutoringAccept } from "@/hooks/mutation/usePostTutoringAccept";
import { useUpdateTeacherAvailableWithToken } from "@/hooks/mutation/usePutAvailableTeacherTime";
import { useGetTutoring } from "@/hooks/query/useGetTutoringDetail";

interface Props {
  params: { token: string };
}

export default function TeacherClassMatchingSelectTimePage({ params }: Props) {
  const matchingToken = params.token;
  const router = useRouter();

  const { data, isLoading, isError } = useGetTutoring({ token: matchingToken });
  const { mutateAsync: updateAvailable } = useUpdateTeacherAvailableWithToken();
  const { mutate: acceptMatch } = usePostTutoringAccept();

  useEffect(() => {
    if (data && data.matchStatus !== "대기") {
      router.replace(`/teacher/notify/${matchingToken}/complete`);
    }
  }, [data, router, matchingToken]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  if (isError || !data) {
    return <ErrorUI />;
  }

  const initialAvailable = data.teacherDayTimes.reduce<
    Record<string, string[]>
  >((acc, { day, times }) => {
    acc[day] = times.map((t) =>
      /^\d{2}:\d{2}:\d{2}$/.test(t) ? t : `${t}:00`,
    );
    return acc;
  }, {});

  const handleMatch = async (currentTime: Record<string, string[]>) => {
    try {
      await updateAvailable({ token: matchingToken, available: currentTime });
      acceptMatch(
        { token: matchingToken },
        {
          onSuccess: () => {
            router.push(`/teacher/notify/${matchingToken}/complete`);
          },
          onError: () => {
            alert("이미 신청한 매칭건입니다.");
          },
        },
      );
    } catch (err) {
      alert(err);
    }
  };

  return (
    <TeacherSettingTime
      pageToken={matchingToken}
      initialAvailable={initialAvailable}
      submitLabel="매칭 신청하기"
      onSubmit={handleMatch}
      requireCellSelection
      disableUnsavedWarning
      onBackButtonConfirm={() => window.history.back()}
      onPopstateConfirm={() => window.history.back()}
      isConfirm={{
        title: "정말 가능한 시간만 선택했나요?",
        message: `선택한 시간으로 매칭된 과외를 거절하면\n이후 매칭의 우선순위가 낮아져요`,
        confirmText: "정말 가능해요",
        cancelText: "다시 수정할게요",
      }}
    />
  );
}
