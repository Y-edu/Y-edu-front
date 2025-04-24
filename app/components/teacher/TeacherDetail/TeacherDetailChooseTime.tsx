// parent 모드 TimeTable
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import { useTimeTable } from "@/components/teacher/TimeTable/useTimeTable";
import TimeTable from "@/components/teacher/TimeTable";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import TitleSection from "@/ui/TitleSection";
import Button from "@/ui/Button";
import GlobalSnackbar from "@/ui/Snackbar";
import IconWarning from "@/icons/IconWarning";
import ErrorUI from "@/ui/ErrorUI";

interface TeacherInfo {
  available: Record<string, string[]>;
  classCount: string;
  classTime: string;
}

export default function TeacherDetailChooseTime() {
  const router = useRouter();
  const [data, setData] = useState<TeacherInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [sessionCount, setSessionCount] = useState<number>(0);
  const [sessionDuration, setSessionDuration] = useState<number>(0);

  const TEST_TOKEN = "6ef83871-5dbe-3e79-8fc0-2c16034fa5ec";
  const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;
  const SERVER_PORT = process.env.NEXT_PUBLIC_PORT;

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
    data?.available ?? {},
    "",
    "",
    "parent",
    sessionDuration,
    sessionCount,
    TEST_TOKEN,
  );

  useEffect(() => {
    async function fetchTeacherInfo() {
      try {
        const baseUrl = `${SERVER_URL}:${SERVER_PORT}`;
        const res = await fetch(
          `${baseUrl}/bff/teacher/info?token=${TEST_TOKEN}`,
        );
        if (!res.ok) throw new Error(`API error ${res.status}`);
        const json = (await res.json()) as TeacherInfo;

        const countMatch = json.classCount.match(/\d+/);
        setSessionCount(countMatch ? parseInt(countMatch[0], 10) : 0);

        const timeMatch = json.classTime.match(/\d+/);
        setSessionDuration(timeMatch ? parseInt(timeMatch[0], 10) : 0);

        setData(json);
      } catch (error) {
        alert(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeacherInfo();
  }, [TEST_TOKEN, SERVER_URL, SERVER_PORT]);

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
      <div className="fixed inset-x-0 bottom-0 bg-white px-5 pb-5">
        <div className="absolute top-[-20px] h-[20px] w-full bg-gradient-to-t from-white to-transparent" />
        <Button
          disabled={!hasChanges}
          onClick={handleParentSubmit}
          className="h-[59px] w-full rounded-[12px] font-bold"
        >
          변경된 시간 저장
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
