"use client";

import { useSearchParams, useParams } from "next/navigation";

import { useGetMatchingSchedule } from "@/hooks/query/useGetMatchingSchedule";
import OnBoarding from "@/components/result/OnBoarding";
import ConfirmedResult from "@/components/result/ConfirmedResult";
import RejectedResult from "@/components/result/RejectedResult";
import SubmittedResult from "@/components/result/SubmittedResult";
import HeaderWithBack from "@/components/result/HeaderWithBack";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const { managementId } = useParams();

  const step = searchParams.get("step") ?? "onBoarding";

  const { data, isLoading } = useGetMatchingSchedule({
    classScheduleManagementId: managementId as string,
  });

  if (isLoading) {
    return (
      <HeaderWithBack onBack={() => history.back()} title="상담 결과 공유">
        <div className="h-full px-[20px] py-[32px]">
          <p>Loading...</p>
        </div>
      </HeaderWithBack>
    );
  }

  if (data && !data.exist) {
    return (
      <HeaderWithBack title="상담 결과 공유">
        <div className="h-full px-[20px] py-[32px]">
          <SubmittedResult />
        </div>
      </HeaderWithBack>
    );
  }

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
        {step === "submitted" && <SubmittedResult />}
      </div>
    </HeaderWithBack>
  );
}
