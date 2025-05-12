import { ErrorBoundary } from "react-error-boundary";

import ErrorUI from "@/ui/ErrorUI";

export default function TeacherSessionCompletePage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div>과외 완료 화면</div>
    </ErrorBoundary>
  );
}
