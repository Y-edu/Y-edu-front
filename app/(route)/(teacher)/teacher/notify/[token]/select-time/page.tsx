"use client";

import { useEffect, useState } from "react";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
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
            setIsSubmitting(false);
          },
        },
      );
    } catch (err) {
      alert(err);
      setIsSubmitting(false);
    }
  };

  return (
    <TeacherSettingTime
      pageToken={matchingToken}
      initialAvailable={initialAvailable}
      submitLabel="매칭 신청하기"
      onSubmit={handleMatch}
      isSubmitting={isSubmitting}
      requireCellSelection
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
