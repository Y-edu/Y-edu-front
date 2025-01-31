import { useGetTutoring } from "../../hooks/query";
import { TEACHER_STYLE_ICON } from "../../constants/teacherStyle";

import { MatchingInfo } from "./MatchingInfo";
import IconTitleChip from "./IconTitleChip";

interface MatchingProposalProps {
  teacherId: string;
  matchingId: string;
}

export function MatchingProposal({
  teacherId,
  matchingId,
}: MatchingProposalProps) {
  const { data } = useGetTutoring({
    teacherId,
    matchingId,
  });

  return (
    <section>
      <MatchingInfo
        detail={data.data.detail}
        online={data.data.online}
        subject={data.data.subject}
        district={data.data.district}
        dong={data.data.dong}
        classCount={data.data.classCount}
        classTime={data.data.classTime}
        age={data.data.age}
      />
      <h2 className="mt-[46px] text-[18px] font-bold text-[#3a3a3a]">
        이걸 중심적으로 배우고 싶어요.
      </h2>
      <div className="flex">
        <IconTitleChip
          title={data.data.goal.split(",")[0]}
          icon={TEACHER_STYLE_ICON["수업 중심을 잡아주는 능숙한 선생님"]}
        />
        <IconTitleChip
          title={data.data.goal.split(",")[1]}
          icon={TEACHER_STYLE_ICON["열정적인 선생님"]}
        />
      </div>
    </section>
  );
}
