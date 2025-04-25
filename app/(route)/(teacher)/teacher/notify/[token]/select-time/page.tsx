"use client";
import { useParams, useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

import ErrorUI from "@/ui/ErrorUI";
import { TeacherSettingTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import { usePostTutoringAccept } from "@/hooks/mutation/usePostTutoringAccept";
import { useGetTutoring } from "@/hooks/query/useGetTutoringDetail";

export default function TeacherClassMatchingSelectTimePage() {
  const { token } = useParams();
  if (!token || Array.isArray(token)) {
    throw new Error("유효하지 않은 토큰입니다.");
  }
  const matchingToken = token;
  const router = useRouter();
  const { data, isLoading, isError } = useGetTutoring({ token: matchingToken });
  const { mutate } = usePostTutoringAccept();

  const initialAvailable = data.teacherDayTimes.reduce<
    Record<string, string[]>
  >((acc, { day, times }) => {
    acc[day] = times.map((t) =>
      /^\d{2}:\d{2}:\d{2}$/.test(t) ? t : `${t}:00`,
    );
    return acc;
  }, {});

  const handleMatch = (currentTime: Record<string, string[]>) => {
    mutate(
      { token: matchingToken, available: currentTime },
      {
        onSuccess: () => {
          router.push(`/teacher/notify/${matchingToken}/complete`);
        },
      },
    );
  };

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

  return (
    <TeacherSettingTime
      pageToken={matchingToken}
      initialAvailable={initialAvailable}
      submitLabel="매칭 신청하기"
      onSubmit={handleMatch}
      disableUnsavedWarning
      onBackButtonConfirm={() => window.history.back()}
      onPopstateConfirm={() => window.history.back()}
      isConfirm={{
        title: "매칭 신청 확인",
        message: "정말 이 시간으로 매칭 신청을 진행하시겠습니까?",
        confirmText: "신청하기",
        cancelText: "취소",
      }}
    />
  );
}
