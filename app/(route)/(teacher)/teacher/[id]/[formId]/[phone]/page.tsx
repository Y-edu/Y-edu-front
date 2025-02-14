import { ErrorBoundary } from "react-error-boundary";
import { MatchingProposal } from "../../../../../../components/teacher/MatchingProposal";
import ErrorUI from "../../../../../../ui/ErrorUI";

export default function TeacherApplyPage({
  params,
}: {
  params: {
    id: string;
    formId: string;
    phone: string;
  };
}) {
  const { id, formId, phone } = params;

  return (
    <ErrorBoundary fallback={<ErrorUI />}>
      <div>
        <MatchingProposal
          teacherId={id}
          phoneNumber={phone}
          applcationFormId={formId}
        />
      </div>
    </ErrorBoundary>
  );
}
