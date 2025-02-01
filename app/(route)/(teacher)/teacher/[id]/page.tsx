"use client";

import { MatchingProposal } from "../../../../components/teacher/MatchingProposal";
import ProfileInfoBox from "../../../../components/teacher/ProfileInfoBox";

export default function TeacherPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <MatchingProposal matchingId={params.id} teacherId={params.id} />
    </div>
  );
}
