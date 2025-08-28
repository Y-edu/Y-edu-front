"use client";

import { useRouter } from "next/navigation";

import SessionActions from "@/components/parents/session-actions/SessionActions";
import HeaderWithBack from "@/components/result/HeaderWithBack";

export default function ParentsSessionActionsPausePage() {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col items-center">
      <HeaderWithBack
        title="Y-Edu"
        hasBack
        onBack={() => router.back()}
        mainClassName="pt-8 w-full px-5"
      >
        <SessionActions />
      </HeaderWithBack>
    </div>
  );
}
