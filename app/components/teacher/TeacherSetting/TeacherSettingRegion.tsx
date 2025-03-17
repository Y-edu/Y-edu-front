"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { Snackbar } from "@mui/material";

import ErrorUI from "@/ui/ErrorUI";
import BulletList from "@/ui/List/BulletList";
import { buttonLabels } from "@/constants/buttonLabels";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import { usePatchTeacherSettingRegion } from "@/hooks/mutation/usePatchTeacherSettingRegion";

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

  const { data, isLoading } = useGetTeacherSettingInfo({
    name: teacherName,
    phoneNumber: teacherPhone,
  });

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

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  if (!data) return <ErrorUI />;

  const onClickSave = () => {
    const updatedDistricts = buttonLabels.filter((_, index) =>
      activeButtons.includes(index),
    );
    if (confirm("변경된 지역을 저장하시겠습니까?")) {
      patchRegion(
        {
          name: teacherName,
          phoneNumber: teacherPhone,
          districts: updatedDistricts,
        },
        {
          onSuccess: () => {
            setSnackbarOpen(true);
          },
        },
      );
    }
  };

  return (
    <div>
      <div className="ml-3 flex flex-row items-center border-b border-primaryPale pb-5 pt-10">
        <Link href="/teachersetting">
          <Image
            src={BackArrow}
            alt="뒤로가기"
            className="mr-2 size-8 cursor-pointer"
          />
        </Link>
        <p className="font-pretendard text-xl font-bold text-labelStrong">
          과외 가능 지역
        </p>
      </div>
      <BulletList
        items={[
          "지역 버튼을 눌러 가능한 지역을 선택해주세요.",
          "변경된 지역 저장 버튼을 눌러야 최종 저장됩니다.",
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
          className={`h-[48px] w-full rounded-[12px] ${
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
    </div>
  );
}
