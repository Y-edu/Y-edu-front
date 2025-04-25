// parent 모드 TimeTable
"use client";

import { useRouter, useParams } from "next/navigation";

import { useTimeTable } from "@/components/teacher/TimeTable/useTimeTable";
import TimeTable from "@/components/teacher/TimeTable";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import TitleSection from "@/ui/TitleSection";
import Button from "@/ui/Button";
import GlobalSnackbar from "@/ui/Snackbar";
import IconWarning from "@/icons/IconWarning";
import { useRecommendStore } from "@/store/teacher/recommend/useRecommendStore";

export default function TeacherDetailChooseTime() {
  const router = useRouter();
  const params = useParams();

  if (!params.token || Array.isArray(params.token)) {
    throw new Error("유효하지 않은 토큰입니다.");
  }
  const token = params.token;
  const available = useRecommendStore((s) => s.available);
  const classCountStr = useRecommendStore((s) => s.classCount);
  const classTimeStr = useRecommendStore((s) => s.classTime);

  const countMatch = classCountStr?.match(/\d+/);
  const sessionCount = countMatch ? parseInt(countMatch[0], 10) : 0;
  const timeMatch = classTimeStr?.match(/\d+/);
  const sessionDuration = timeMatch ? parseInt(timeMatch[0], 10) : 0;

  const {
    currentTime,
    selectedSessions,
    hasChanges,
    handleCellClick,
    handleCellUnclick,
    handleParentSubmit,
    snackbarOpen,
    snackbarMessage,
    closeSnackbar,
  } = useTimeTable(
    available,
    "",
    "",
    "parent",
    sessionDuration,
    sessionCount,
    token,
  );

  return (
    <HeaderWithBack hasBack onBack={() => router.back()} title="과외시간 선택">
      {/* 안내 섹션 */}
      <TitleSection className="m-5 mb-10 mt-8">
        <TitleSection.Title>
          수업 시간(회당 <span className="font-bold">{sessionDuration}분</span>
          )을
          <br />주 <span className="font-bold">{sessionCount}회</span> 선택해
          주세요
        </TitleSection.Title>
        <TitleSection.Description>
          선생님이 가능한 시간이에요
        </TitleSection.Description>
      </TitleSection>

      {/* 타임테이블 */}
      <TimeTable
        mode="parent"
        currentTime={currentTime}
        selectedSessions={selectedSessions}
        onCellClick={handleCellClick}
        onCellUnclick={handleCellUnclick}
      />

      {/* 저장 버튼 */}
      <div className="sticky bottom-0 mx-5 bg-white pb-[10px]">
        <div className="absolute top-[-20px] h-[20px] w-full bg-gradient-to-t from-white to-transparent" />
        <Button
          disabled={!hasChanges}
          onClick={handleParentSubmit}
          className="h-[59px]"
        >
          수업시간 확정하기
        </Button>
      </div>

      {/* 스낵바 */}
      <GlobalSnackbar
        open={snackbarOpen}
        icon={<IconWarning iconColor="#FFD700" />}
        message={snackbarMessage}
        onClose={closeSnackbar}
      />
    </HeaderWithBack>
  );
}
