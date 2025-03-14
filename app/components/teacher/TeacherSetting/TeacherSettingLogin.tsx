"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useGetTeacherSettingInfo } from "@/hooks/query/useGetTeacherSettingInfo";

export default function TeacherSettingLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const { data, refetch } = useGetTeacherSettingInfo(
    { name, phoneNumber: phone },
    { enabled: false, gcTime: 0, staleTime: 0, refetchOnMount: false },
  );

  useEffect(() => {
    if (data) {
      localStorage.setItem("teacherName", name);
      localStorage.setItem("teacherPhone", phone);
      router.push("/teachersetting");
    }
  }, [data, name, phone, router]);

  const handleLogin = async () => {
    if (!name || !phone) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }
    const result = await refetch();
    if (result.error) {
      alert("이름 또는 전화번호 정보가 일치하지 않습니다.");
    }
  };

  return (
    <div>
      <p className="border-b border-primaryPale pb-5 pt-10 text-center font-pretendard text-xl font-bold text-labelStrong">
        <span className="text-primary">Y-Edu</span> 선생님 과외 설정
      </p>
      <div className="flex flex-col px-5">
        <input
          type="text"
          placeholder="이름 (ex.김에듀)"
          className="input mb-5 mt-10 h-[48px] w-full rounded-[12px] border py-3 pl-5"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="전화번호 (ex.01012345678)"
          className="input mb-10 h-[48px] w-full rounded-[12px] border py-3 pl-5"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="h-[48px] w-full rounded-[12px] bg-primaryNormal text-white"
        >
          로그인
        </button>
      </div>
    </div>
  );
}
