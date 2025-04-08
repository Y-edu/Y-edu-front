"use client";

import { useSearchParams } from "next/navigation";

import ConfirmedResult from "@/components/result/ConfirmedResult";
import RejectedResult from "@/components/result/RejectedResult";
import OnBoarding from "@/components/result/OnBoarding";
import HeaderWithBack from "@/components/result/HeaderWithBack";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const step = searchParams.get("step") ?? "onBoarding";

  return (
    <HeaderWithBack
      onBack={() => history.back()}
      title="상담 결과 공유"
      hasBack={step !== "onBoarding"}
    >
      <div className="h-full px-[20px] py-[32px]">
        {step === "onBoarding" && <OnBoarding />}
        {step === "confirmed" && <ConfirmedResult />}
        {step === "rejected" && <RejectedResult />}
      </div>
    </HeaderWithBack>
  );
}
