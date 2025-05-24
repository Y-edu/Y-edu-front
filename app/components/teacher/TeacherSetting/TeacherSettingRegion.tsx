"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

import ErrorUI from "@/ui/ErrorUI";
import { Modal } from "@/ui";
import { buttonLabels } from "@/constants/buttonLabels";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import { usePatchTeacherSettingRegion } from "@/hooks/mutation/usePatchTeacherSettingRegion";
import useUnsavedBackWarning from "@/hooks/custom/useUnsavedBackWarning";
import HeaderWithBack from "@/components/result/HeaderWithBack";
import Button from "@/ui/Button";
import GlobalSnackbar from "@/ui/Snackbar";
import TitleSection from "@/ui/TitleSection";

const arraysEqual = (a: number[], b: number[]) =>
  a.length === b.length &&
  [...a].sort().every((val, i) => val === [...b].sort()[i]);

export default function TeacherSettingRegion() {
  const router = useRouter();
  const [activeButtons, setActiveButtons] = useState<number[]>([]);
  const [initialActive, setInitialActive] = useState<number[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
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
    {
      name: teacherName,
      phoneNumber: teacherPhone,
    },
    {
      enabled: isQueryEnabled,
    },
  );

  const { mutate: patchRegion, isPending: patchLoading } =
    usePatchTeacherSettingRegion();

  useEffect(() => {
    if (data) {
      const initial = buttonLabels.reduce<number[]>((acc, label, index) => {
        return data.districts.includes(label) ? [...acc, index] : acc;
      }, []);
      setActiveButtons(initial);
      setInitialActive(initial);
    }
  }, [data]);

  const onClickButton = (index: number) =>
    setActiveButtons((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );

  const regions = useMemo(
    () =>
      buttonLabels.map((label, index) => {
        const isActive = activeButtons.includes(index);
        const btnClass = isActive
          ? "bg-primaryNormal text-white"
          : "bg-[#eeeeee] text-labelAssistive";
        return (
          <button
            key={index}
            onClick={() => onClickButton(index)}
            className={`${btnClass} h-[48px] rounded-[12px] font-semibold`}
          >
            {label}
          </button>
        );
      }),
    [activeButtons],
  );

  const hasChanges = useMemo(
    () => !arraysEqual(activeButtons, initialActive),
    [activeButtons, initialActive],
  );

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

  const onClickSave = () => {
    const updatedDistricts = buttonLabels.filter((_, index) =>
      activeButtons.includes(index),
    );
    patchRegion(
      {
        name: teacherName,
        phoneNumber: teacherPhone,
        districts: updatedDistricts,
      },
      {
        onSuccess: () => {
          setSnackbarOpen(true);
          setInitialActive(activeButtons);
        },
      },
    );
  };

  if (isQueryEnabled && isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }
  if (isQueryEnabled && (isError || !data)) return <ErrorUI />;

  return (
    <HeaderWithBack hasBack onBack={handleBackClick} title="과외 가능 지역">
      <TitleSection className="m-5 mb-10 mt-8">
        <TitleSection.Title className="whitespace-pre-line">
          {`정말 수업이 가능한 지역을\n모두 선택해주세요`}
        </TitleSection.Title>
        <TitleSection.Description className="whitespace-pre-line">
          선택한 지역에 맞는 학부모님과 매칭돼요
        </TitleSection.Description>
      </TitleSection>
      <div className="grid h-auto w-full grid-cols-3 grid-rows-11 gap-3 bg-white px-5 pb-[100px]">
        {regions}
      </div>
      <div className="sticky bottom-0 mx-5 bg-white pb-[10px]">
        <div className="absolute top-[-20px] h-[20px] w-full bg-gradient-to-t from-white to-transparent" />
        <Button
          disabled={!hasChanges || patchLoading}
          onClick={onClickSave}
          className="h-[59px] w-full rounded-[12px] font-bold"
        >
          변경된 지역 저장
        </Button>
      </div>
      <GlobalSnackbar
        open={snackbarOpen}
        message="변경된 지역이 저장되었습니다."
        onClose={() => setSnackbarOpen(false)}
      />
      <Modal
        title="변경 사항이 저장되지 않았어요!"
        message={`아직 변경된 지역이 저장되지 않았어요.\n저장하지 않고 나가시겠습니까?`}
        confirmText="저장하지 않고 나가기"
        cancelText="머무르기"
        isOpen={isModalOpen}
        handleOnConfirm={handleModalConfirm}
        handleOnCancel={handleModalCancel}
      />
    </HeaderWithBack>
  );
}
