import { ErrorBoundary } from "react-error-boundary";

import ErrorUI from "@/ui/ErrorUI";
import SessionActionsLogin from "@/components/parents/session-actions/SessionActionsLogin";
import HeaderWithBack from "@/components/result/HeaderWithBack";

export default function ParentsSessionActionsLoginPage() {
  return (
    <div className="flex flex-col items-center">
      <ErrorBoundary fallback={<ErrorUI />}>
        <HeaderWithBack title="Y-Edu" mainClassName="pt-8 w-full px-5">
          <SessionActionsLogin />
        </HeaderWithBack>
      </ErrorBoundary>
    </div>
  );
}
