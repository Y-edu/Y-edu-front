"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { usePostTokenSessions } from "@/hooks/mutation/usePostTokenSessions";
import { useGlobalSnackbar } from "@/providers/GlobalSnackBar";

export default function TeacherSessionLogin() {
  const toast = useGlobalSnackbar();
  const router = useRouter();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: postTokenSessions } = usePostTokenSessions();

  const handleLogin = useCallback(() => {
    setIsLoading(true);
    postTokenSessions(
      { name, phoneNumber },
      {
        onSuccess: (data) => {
          if (!data.token) {
            toast.warning(
              "조회된 수업 정보가 없습니다. 관리자에게 문의해 주세요.",
            );
          } else {
            // 성공
            localStorage.setItem("name", name);
            localStorage.setItem("phoneNumber", phoneNumber);
            router.push(`/teacher/session-schedule?token=${data.token}`);
          }
          setIsLoading(false);
        },
        onError: () => {
          toast.warning("이름 또는 전화번호 정보가 일치하지 않습니다.");
          setIsLoading(false);
        },
      },
    );
  }, [name, phoneNumber, postTokenSessions, toast, router]);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (name && phoneNumber) {
      setName(name);
      setPhoneNumber(phoneNumber);
      handleLogin();
    }
  }, [router, handleLogin]);

  return (
    <div>
      <p className="pb-5 pt-10 text-center font-pretendard text-xl font-bold text-labelStrong">
        <span className="text-primary">Y-Edu</span> 선생님 수업 관리
      </p>
      <div className="flex flex-col px-5">
        <section>
          <p className="mb-6 text-center text-sm text-gray-600">
            선생님 등록 시 입력한 이름과 전화번호를 입력하면
            <br />
            본인의 수업 관리 페이지로 이동할 수 있습니다.
          </p>
        </section>
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
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="relative flex h-[48px] w-full items-center justify-center rounded-[12px] bg-primaryNormal text-white"
        >
          {isLoading ? (
            <span className="loader size-6 rounded-full border-4 border-t-transparent" />
          ) : (
            "수업 관리 페이지로 이동"
          )}
        </button>
      </div>
    </div>
  );
}
