"use client";

import { useSearchParams, useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useGetMatchingSchedule } from "@/hooks/query/useGetMatchingSchedule";
import OnBoarding from "@/components/result/OnBoarding";
import ConfirmedResult from "@/components/result/ConfirmedResult";
import RejectedResult from "@/components/result/RejectedResult";
import SubmittedResult from "@/components/result/SubmittedResult";
import HeaderWithBack from "@/components/result/HeaderWithBack";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const { managementId } = useParams();
  const router = useRouter();

  const step = searchParams.get("step") ?? "onBoarding";

  const { data, isLoading } = useGetMatchingSchedule({
    classScheduleManagementId: managementId as string,
  });

  // useEffect(() => {
  //   if (data && !data.exist && step !== "submitted") {
  //     router.replace("?step=submitted");
  //   }
  // }, [data, step]);

  if (isLoading) {
    return (
      <HeaderWithBack onBack={() => history.back()} title="상담 결과 공유">
        <div className="h-full px-[20px] py-[32px]">
          <p>Loading...</p>
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
