import { ErrorBoundary } from "react-error-boundary";

import { MatchingProposal } from "@/components/teacher/MatchingProposal";
import ErrorUI from "@/ui/ErrorUI";

export default function TeacherClassMatchingPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;
  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div>
        <MatchingProposal token={token} />
      </div>
    </ErrorBoundary>
  );
}
