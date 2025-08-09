"use client";

import HeaderWithBack from "@/components/result/HeaderWithBack";
import SessionActionsMain from "@/components/parents/session-actions/SessionActionsMain";

export default function ParentsSessionActionsMainPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <HeaderWithBack
        title="Y-Edu"
        hasBack
        onBack={() => window.history.back()}
        mainClassName="pt-8 w-full px-5"
      >
        <SessionActionsMain />
      </HeaderWithBack>
    </div>
  );
}
