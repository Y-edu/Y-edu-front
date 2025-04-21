"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";

import BulletList from "@/ui/List/BulletList";
import ErrorUI from "@/ui/ErrorUI";
import { Modal } from "@/ui";
import GlobalSnackbar from "@/ui/Snackbar";
import Button from "@/ui/Button";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import useUnsavedBackWarning from "@/hooks/custom/useUnsavedBackWarning";
import { useTimeTable } from "@/components/teacher/TimeTable/useTimeTable";
import TimeTable from "@/components/teacher/TimeTable/index";

import BackArrow from "public/images/arrow-black.png";

export function TeacherSettingTime() {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("teacherName") || "";
    const storedPhone = localStorage.getItem("teacherPhone") || "";

    if (!storedName || !storedPhone) {
      alert("로그인하세요");
      router.push("/teachersetting/login");
      return;
    }

    setTeacherName(storedName);
    setTeacherPhone(storedPhone);
  }, [router]);

  const isQueryEnabled = Boolean(teacherName && teacherPhone);
  const { data, isLoading, isError } = useGetTeacherSettingInfo(
    { name: teacherName, phoneNumber: teacherPhone },
    { enabled: isQueryEnabled },
  );

  const {
    currentDate,
    selectedCell,
    hasChanges,
    snackbarOpen,
    handleCellClick,
    handleNotClick,
    handleSubmit,
    closeSnackbar,
  } = useTimeTable(data?.available ?? {}, teacherName, teacherPhone, "teacher");

  const {
    isModalOpen,
    handleBackClick,
    handleModalConfirm,
    handleModalCancel,
  } = useUnsavedBackWarning(
    hasChanges,
    () => window.history.go(-1),
    () => router.push("/teachersetting"),
  );

  if (!isQueryEnabled) return null;
  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (isError || !data) return <ErrorUI />;

  return (
    <div>
      {/* 헤더 */}
      <div className="ml-3 flex items-center border-b border-primaryPale pb-5 pt-10">
        <button onClick={handleBackClick} className="flex items-center">
          <Image
            src={BackArrow}
            alt="뒤로가기"
            className="mr-2 size-8 cursor-pointer"
          />
        </button>
        <p className="font-pretendard text-xl font-bold text-labelStrong">
          과외 가능 시간
        </p>
      </div>

      {/* 안내 문구 */}
      <div className="m-5 rounded-md border border-blue-300 bg-blue-100 p-4">
        <p className="text-sm text-blue-800">
          과외 공지는 설정하신 가능시간과 상관 없이 발송되며,
          <br />
          시간 기반 매칭은 곧 출시 예정이에요 😊
        </p>
      </div>

      {/* 포인트 리스트 */}
      <BulletList
        items={[
          "가능시간이 많을수록, 매칭에 유리해요",
          "꼭 3개월 지도 가능한 정기일정을 설정해주세요",
        ]}
        className="mb-10 py-3 pl-[40px]"
      />

      {/* 타임테이블 */}
      <TimeTable
        mode="teacher"
        currentDate={currentDate}
        selectedCell={selectedCell}
        onCellClick={handleCellClick}
        onCellUnclick={handleNotClick}
      />

      {/* 저장 버튼 */}
      <div className="fixed inset-x-0 bottom-0 bg-white px-5 pb-5">
        <div className="absolute top-[-20px] h-[20px] w-full bg-gradient-to-t from-white to-transparent" />
        <Button
          disabled={!hasChanges}
          onClick={handleSubmit}
          className="h-[59px] w-full rounded-[12px] font-bold"
        >
          변경된 시간 저장
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
        message="아직 변경된 시간이 저장되지 않았어요. 저장하지 않고 나가시겠습니까?"
        confirmText="저장하지 않고 나가기"
        cancelText="머무르기"
        isOpen={isModalOpen}
        handleOnConfirm={handleModalConfirm}
        handleOnCancel={handleModalCancel}
      />
    </div>
  );
}
