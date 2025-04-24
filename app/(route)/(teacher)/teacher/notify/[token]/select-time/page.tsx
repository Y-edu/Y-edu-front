"use client";
import { useParams, useRouter } from "next/navigation";

import { TeacherSettingTime } from "@/components/teacher/TeacherSetting/TeacherSettingTime";
import { usePostTutoringAccept } from "@/hooks/mutation/usePostTutoringAccept";

export default function TeacherClassMatchingSelectTimePage() {
  const params = useParams();

  if (!params.token || Array.isArray(params.token)) {
    throw new Error("유효하지 않은 토큰입니다.");
  }
  const token = params.token;

  const router = useRouter();
  const { mutate } = usePostTutoringAccept();
  const handleMatch = () => {
    mutate(
      { token },
      {
        onSuccess: () => {
          router.push(`/teacher/notify/${token}/complete`);
        },
      },
    );
  };

  return (
    <TeacherSettingTime
      submitLabel="매칭 신청하기"
      onSubmit={handleMatch}
      onBackButtonConfirm={() => window.history.back()}
      onPopstateConfirm={() => window.history.back()}
      disableUnsavedWarning
      isConfirm={{
        title: "매칭 신청 확인",
        message: "정말 이 시간으로 매칭 신청을 진행하시겠습니까?",
        confirmText: "신청하기",
        cancelText: "취소",
      }}
    />
  );
}
