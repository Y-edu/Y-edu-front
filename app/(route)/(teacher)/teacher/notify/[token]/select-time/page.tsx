"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ErrorUI from "@/ui/ErrorUI";
import { TeacherSettingTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import { usePostTutoringAccept } from "@/hooks/mutation/usePostTutoringAccept";
import { useUpdateTeacherAvailableWithToken } from "@/hooks/mutation/usePutAvailableTeacherTime";
import { useGetTutoring } from "@/hooks/query/useGetTutoringDetail";
import LoadingUI from "@/ui/LoadingUI";

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
    return <LoadingUI />;
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

  if (isSubmitting) {
    return <LoadingUI />;
  }

  return (
    <TeacherSettingTime
      pageToken={matchingToken}
      initialAvailable={initialAvailable}
      submitLabel="매칭 신청하기"
      headerTitle={`과외가 가능한 시간을\n모두 업데이트해주세요`}
      headerDescription={`학부모님이 선호하는 시간과 상관없이\n평소 수업이 가능한 시간을 모두 선택해주세요`}
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
