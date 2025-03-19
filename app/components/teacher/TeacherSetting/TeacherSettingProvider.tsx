"use client";

import { useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";

import type { TeacherSettingInfoResponse } from "@/actions/get-teacher-setting-info";
import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";
import ErrorUI from "@/ui/ErrorUI";

interface TeacherSettingProviderProps {
  children: (
    data: TeacherSettingInfoResponse,
    teacherName: string,
    teacherPhone: string,
  ) => ReactNode;
}

export default function TeacherSettingProvider({
  children,
}: TeacherSettingProviderProps) {
  const router = useRouter();
  const [teacherName, setTeacherName] = useState<string | null>(null);
  const [teacherPhone, setTeacherPhone] = useState<string | null>(null);

  useEffect(() => {
    const storedName = localStorage.getItem("teacherName");
    const storedPhone = localStorage.getItem("teacherPhone");

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
      name: teacherName ?? "",
      phoneNumber: teacherPhone ?? "",
    },
    {
      enabled: isQueryEnabled,
    },
  );

  if (!isQueryEnabled || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <CircularProgress />
      </div>
    );
  }

  if (isError || !data) {
    return <ErrorUI />;
  }

  return <>{children(data, teacherName as string, teacherPhone as string)}</>;
}
