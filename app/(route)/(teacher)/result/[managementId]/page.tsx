"use client";

import { useState } from "react";

import HeaderWithBack from "@/components/result/HeaderWithBack";
import OnBoarding from "@/components/result/OnBoarding";
import RejectedResult from "@/components/result/RejectedResult";
import ConfirmedResult from "@/components/result/ConfirmedResult";

type StepType = "onBoarding" | "confirmed" | "rejected";

export default function ResultPage() {
  const [currentStep, setCurrentStep] = useState<StepType>("onBoarding");

  return (
    <HeaderWithBack
      onBack={() => setCurrentStep("onBoarding")}
      title="상담 결과 공유"
      hasBack={currentStep !== "onBoarding"}
    >
      <div className="h-full px-[20px] py-[32px]">
        {currentStep === "onBoarding" && <OnBoarding onNext={setCurrentStep} />}
        {currentStep === "confirmed" && <ConfirmedResult />}
        {currentStep === "rejected" && <RejectedResult />}
      </div>
    </HeaderWithBack>
  );
}
