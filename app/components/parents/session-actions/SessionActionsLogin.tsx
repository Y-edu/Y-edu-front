"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { getParentsSessionsByPhoneNumber } from "@/actions/get-parents-sessions";
import DivWithLabel from "@/components/result/DivWithLabel";
import TitleSection from "@/ui/TitleSection";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

export default function SessionActionsLogin() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const cleanedPhoneNumber = phoneNumber.replace(/-/g, "");
  const isPhoneNumberValid = /^\d{10,13}$/.test(cleanedPhoneNumber);

  const handleSubmit = async () => {
    setIsSubmitted(true);
    if (!isPhoneNumberValid) return;

    const data = await getParentsSessionsByPhoneNumber(cleanedPhoneNumber);

    if (!data || data.length === 0) {
      alert("해당 번호로 등록된 과외가 없습니다.");
      return;
    }

    router.push(`/parents/session-actions/${cleanedPhoneNumber}`);
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
        <DivWithLabel
          label="수업을 진행했나요?"
          labelClassName="text-[20px]"
          className="w-full"
        >
          <Input
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="전화번호를 입력해주세요"
            errorMessage={
              isSubmitted && !phoneNumber ? "전화번호를 입력해주세요." : ""
            }
            status={isSubmitted && !phoneNumber ? "warning" : "default"}
            onBlur={() => {
              document.querySelector<HTMLElement>('[role="radio"]')?.focus();
            }}
          />
        </DivWithLabel>
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
