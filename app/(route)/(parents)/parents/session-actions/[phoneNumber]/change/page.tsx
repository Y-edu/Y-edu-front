"use client";

import SessionActions from "@/components/parents/session-actions/SessionActions";
import HeaderWithBack from "@/components/result/HeaderWithBack";

export default function ParentsSessionActionsChangePage() {
  return (
    <div className="flex w-full flex-col items-center">
      <HeaderWithBack
        title="Y-Edu"
        hasBack
        onBack={() => window.history.back()}
        mainClassName="pt-8 w-full px-5"
      >
        <SessionActions />
      </HeaderWithBack>
    </div>
  );
}
