"use client";

import { useRouter } from "next/navigation";

import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionActionsMain from "@/components/parents/session-actions/SessionActionsMain";

export default function ParentsSessionActionsMainPage() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center">
      <HeaderWithBack
        title="Y-Edu"
        hasBack
        onBack={() => router.back()}
        mainClassName="pt-8 w-full px-5"
      >
        <SessionActionsMain />
      </HeaderWithBack>
    </div>
  );
}
