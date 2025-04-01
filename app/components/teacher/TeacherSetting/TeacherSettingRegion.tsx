"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";

import ErrorUI from "@/ui/ErrorUI";
import BulletList from "@/ui/List/BulletList";
import { Modal } from "@/ui";
import { buttonLabels } from "@/constants/buttonLabels";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import { usePatchTeacherSettingRegion } from "@/hooks/mutation/usePatchTeacherSettingRegion";
import useUnsavedBackWarning from "@/hooks/custom/useUnsavedBackWarning";

import BackArrow from "public/images/arrow-black.png";

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

  const buttons = useMemo(
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

  if (!isQueryEnabled) {
    return null;
  }

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
    <div>
      <div className="ml-3 flex flex-row items-center border-b border-primaryPale pb-5 pt-10">
        <button onClick={handleBackClick} className="flex items-center">
          <Image
            src={BackArrow}
            alt="뒤로가기"
            className="mr-2 size-8 cursor-pointer"
          />
        </button>
        <p className="font-pretendard text-xl font-bold text-labelStrong">
          과외 가능 지역
        </p>
      </div>
      <BulletList
        items={[
          "더 많은 지역을 선택할 수록 빠르게 매칭이 가능해요. ",
          "‘강남구’, ‘서초구’ 지역이 과외 문의의 50%를 차지해요.",
        ]}
        className="mb-10 py-3 pl-[40px]"
      />
      <div className="grid h-auto w-full grid-cols-3 grid-rows-11 gap-3 bg-white px-5 pb-[100px]">
        {buttons}
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-[375px] bg-white px-5 pb-4 pt-2">
        <button
          disabled={!hasChanges || patchLoading}
          onClick={onClickSave}
          className={`h-[48px] w-full rounded-[12px] font-bold ${
            hasChanges
              ? "bg-primaryNormal text-white"
              : "bg-gray-400 text-white"
          }`}
        >
          <span>변경된 지역 저장</span>
        </button>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1500}
        onClose={() => setSnackbarOpen(false)}
        message="변경된 지역이 저장되었습니다."
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{
          top: "81%",
          mx: "20px",
        }}
      />
      <Modal
        title="변경 사항이 저장되지 않았어요!"
        message="아직 변경된 지역이 저장되지 않았어요. 저장하지 않고 나가시겠습니까?"
        confirmText="저장하지 않고 나가기"
        cancelText="머무르기"
        isOpen={isModalOpen}
        handleOnConfirm={handleModalConfirm}
        handleOnCancel={handleModalCancel}
      />
    </div>
  );
}
