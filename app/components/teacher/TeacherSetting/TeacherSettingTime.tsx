// teacher 모드 TimeTable
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import ErrorUI from "@/ui/ErrorUI";
import { Modal } from "@/ui";
import GlobalSnackbar from "@/ui/Snackbar";
import Button from "@/ui/Button";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import useUnsavedBackWarning from "@/hooks/custom/useUnsavedBackWarning";
import { useTimeTable } from "@/components/teacher/TimeTable/useTimeTable";
import TimeTable from "@/components/teacher/TimeTable/index";
import TitleSection from "@/ui/TitleSection";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import LoadingUI from "@/ui/LoadingUI";

interface TeacherSettingTimeProps {
  headerTitle?: React.ReactNode;
  headerDescription?: React.ReactNode;
  requireCellSelection?: boolean;
  submitLabel?: string;
  onSubmit?: (currentTime: Record<string, string[]>) => void;
  onPopstateConfirm?: () => void;
  onBackButtonConfirm?: () => void;
  disableUnsavedWarning?: boolean;
  isConfirm?: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  };
  initialAvailable?: Record<string, string[]>;
  pageToken?: string;
}

export function TeacherSettingTime({
  headerTitle,
  headerDescription,
  requireCellSelection = false,
  submitLabel = "변경된 시간 저장",
  onSubmit,
  onPopstateConfirm,
  onBackButtonConfirm,
  disableUnsavedWarning = false,
  isConfirm,
  initialAvailable,
  pageToken,
}: TeacherSettingTimeProps) {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? pageToken;
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    if (initialAvailable || token) return;

    const storedName = localStorage.getItem("teacherName") || "";
    const storedPhone = localStorage.getItem("teacherPhone") || "";

    if (!storedName || !storedPhone) {
      alert("로그인하세요");
      router.push("/teachersetting/login");
      return;
    }

    setTeacherName(storedName);
    setTeacherPhone(storedPhone);
  }, [router, token, initialAvailable]);

  const isQueryEnabled =
    !initialAvailable && Boolean(teacherName && teacherPhone);
  const { data, isLoading, isError } = useGetTeacherSettingInfo(
    { name: teacherName, phoneNumber: teacherPhone },
    { enabled: isQueryEnabled },
  );

  const initialTime = useMemo(
    () => initialAvailable ?? data?.available ?? {},
    [initialAvailable, data],
  );

  const {
    currentTime,
    selectedCell,
    hasChanges,
    snackbarOpen,
    handleCellClick,
    handleCellUnclick,
    handleTeacherSubmit,
    closeSnackbar,
  } = useTimeTable(
    initialTime,
    teacherName,
    teacherPhone,
    "teacher",
    undefined,
    undefined,
    token ?? "",
  );

  const popConfirm = onPopstateConfirm ?? (() => window.history.go(-1));
  const btnConfirm =
    onBackButtonConfirm ?? (() => router.push("/teachersetting"));
  const {
    isModalOpen,
    handleBackClick,
    handleModalConfirm,
    handleModalCancel,
  } = useUnsavedBackWarning(
    disableUnsavedWarning ? false : hasChanges,
    popConfirm,
    btnConfirm,
  );

  const handleClick = () => {
    if (onSubmit) {
      if (isConfirm) {
        setConfirmOpen(true);
      } else {
        onSubmit(currentTime);
      }
    } else {
      handleTeacherSubmit();
    }
  };

  if (isQueryEnabled && isLoading) return <LoadingUI />;
  if (isQueryEnabled && (isError || !data)) return <ErrorUI />;

  return (
    <>
      <HeaderWithBack hasBack onBack={handleBackClick} title="과외 가능 시간">
        {/* 헤더 */}
        <TitleSection className="m-5 mb-10 mt-8">
          <TitleSection.Title className="whitespace-pre-line">
            {headerTitle ?? `정말 수업이 가능한 시간을\n모두 선택해주세요`}
          </TitleSection.Title>
          <TitleSection.Description className="whitespace-pre-line">
            {headerDescription ?? "선택한 시간대에 맞는 학부모님과 매칭돼요"}
          </TitleSection.Description>
        </TitleSection>

        {/* 타임테이블 */}
        <TimeTable
          mode="teacher"
          currentTime={currentTime}
          selectedCell={selectedCell}
          onCellClick={handleCellClick}
          onCellUnclick={handleCellUnclick}
        />

        {/* 저장 버튼 */}
        <div className="fixed bottom-0 left-1/2 z-10 w-full max-w-[500px] -translate-x-1/2 bg-white pb-[10px]">
          <div className="absolute top-[-20px] h-[20px] w-full bg-gradient-to-t from-white to-transparent" />
          <Button
            disabled={
              requireCellSelection
                ? !Object.values(currentTime).some((s) => s.length > 0)
                : !hasChanges
            }
            onClick={handleClick}
            className="mx-auto flex h-[59px] w-[335px] items-center justify-center"
          >
            {submitLabel}
          </Button>
        </div>

        {/* 스낵바 */}
        <GlobalSnackbar
          open={snackbarOpen}
          message="변경된 시간이 저장되었습니다."
          onClose={closeSnackbar}
        />

        {/* 뒤로가기 경고 모달 */}
        <Modal
          title="변경 사항이 저장되지 않았어요!"
          message={`아직 변경된 시간이 저장되지 않았어요.\n저장하지 않고 나가시겠습니까?`}
          confirmText="저장하지 않고 나가기"
          cancelText="머무르기"
          isOpen={isModalOpen}
          handleOnConfirm={handleModalConfirm}
          handleOnCancel={handleModalCancel}
        />
      </HeaderWithBack>

      {isConfirm && (
        <Modal
          title={isConfirm.title}
          message={isConfirm.message}
          confirmText={isConfirm.confirmText ?? submitLabel}
          cancelText={isConfirm.cancelText ?? "취소"}
          isOpen={confirmOpen}
          handleOnConfirm={() => {
            setConfirmOpen(false);
            onSubmit && onSubmit(currentTime);
          }}
          handleOnCancel={() => {
            setConfirmOpen(false);
          }}
        />
      )}
    </>
  );
}
