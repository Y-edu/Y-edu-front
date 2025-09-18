"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getParentsSessionsByPhoneNumber } from "@/actions/get-parents-sessions";
import TitleSection from "@/ui/TitleSection";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

export default function SessionActionsLogin() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const cleanedPhoneNumber = phoneNumber.replace(/-/g, "");
  const isPhoneNumberValid = /^\d{10,13}$/.test(cleanedPhoneNumber);

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!isPhoneNumberValid) {
      setErrorMessage("전화번호 형식이 올바르지 않습니다.");
      return;
    }

    try {
      const data = await getParentsSessionsByPhoneNumber(cleanedPhoneNumber);

      if (!data || data.length === 0) {
        setErrorMessage("해당 번호로 등록된 과외가 없습니다.");
        return;
      }

      router.push(`/parents/session-actions/${cleanedPhoneNumber}`);
    } catch {
      setErrorMessage("일치하지 않는 학부모 번호입니다.");
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-5 flex flex-col gap-10">
        <TitleSection>
          <TitleSection.Title className="text-[24px]">
            학부모님 전화번호를
            <br />
            입력해 주세요
          </TitleSection.Title>
        </TitleSection>

        <Input
          value={phoneNumber}
          onChange={(v) => {
            setPhoneNumber(v);
            if (errorMessage) setErrorMessage("");
          }}
          placeholder="전화번호를 입력해주세요"
          errorMessage={errorMessage}
          status={errorMessage ? "warning" : "default"}
          onBlur={undefined}
        />

        <div className="fixed inset-x-0 bottom-0 flex justify-center bg-white p-4 shadow-lg">
          <Button
            className="w-[375px]"
            disabled={!isPhoneNumberValid}
            onClick={handleSubmit}
          >
            다음
          </Button>
        </div>
      </div>
    </div>
  );
}
