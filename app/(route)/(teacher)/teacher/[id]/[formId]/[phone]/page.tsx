import { MatchingProposal } from "../../../../../../components/teacher/MatchingProposal";

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
    <div>
      <MatchingProposal
        teacherId={id}
        phoneNumber={phone}
        applcationFormId={formId}
      />
    </div>
  );
}
