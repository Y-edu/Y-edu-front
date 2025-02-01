import { useState } from "react";

import { useGetTutoring } from "../../hooks/query";
import { TEACHER_STYLE_ICON } from "../../constants/teacherStyle";
import { useModal } from "../../hooks/custom";
import { usePostTutoringAccept } from "../../hooks/mutation/usePostTutoringAccept";
import { usePostTutoringRefuse } from "../../hooks/mutation/usePostTutoringRefuse";

import { MatchingModal } from "./MatchingModal";
import { MatchingInfo } from "./MatchingInfo";
import IconTitleChip from "./IconTitleChip";
import ProfileInfoBox from "./ProfileInfoBox";

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
  const { openModal, isModalOpen, closeModal } = useModal();
  const [matchingStatus, setMatchingStatus] = useState<"REJECT" | "ACCEPT">(
    "REJECT",
  );
  const { mutate: postTutoringAccept } = usePostTutoringAccept();
  const { mutate: postTutoringReject } = usePostTutoringRefuse();

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
      <ProfileInfoBox title="이걸 중심적으로 배우고 싶어요.">
        <div className="flex gap-[12px]">
          <IconTitleChip
            title={data.data.goal.split(",")[0]}
            icon={TEACHER_STYLE_ICON["수업 중심을 잡아주는 능숙한 선생님"]}
          />
          <IconTitleChip
            title={data.data.goal.split(",")[1]}
            icon={TEACHER_STYLE_ICON["열정적인 선생님"]}
          />
        </div>
      </ProfileInfoBox>
      <div className="order-2 h-[10px] w-[375px] flex-none self-stretch bg-[#F5F5F5]" />
      <ProfileInfoBox title="이런 선생님을 선호해요.">
        {data.data.favoriteCondition}
      </ProfileInfoBox>
      <div className="order-2 h-[10px] w-[375px] flex-none self-stretch bg-[#F5F5F5]" />
      <ProfileInfoBox title="학부모님이 선호하는 시간이에요.">
        {data.data.wantTime}
      </ProfileInfoBox>
      <div className="order-2 h-[10px] w-[375px] flex-none self-stretch bg-[#F5F5F5]" />
      <ProfileInfoBox title="수업이 이렇게 진행되면 좋겠어요.">
        {data.data.wantDirection}
      </ProfileInfoBox>
      <button
        className="order-0 flex h-[58px] w-[335px] flex-none flex-row items-center justify-center gap-[6px] self-stretch rounded-[8px] bg-[#B8B8B8] p-[16px] px-[36px] font-bold text-white"
        onClick={() => {
          setMatchingStatus("ACCEPT");
          openModal();
          postTutoringAccept({
            matchingId,
            teacherId,
          });
        }}
      >
        신청하기
      </button>
      <button
        className="mx-auto my-[18px] flex justify-center border-b-2 border-[#888888] text-[#888888]"
        onClick={() => {
          setMatchingStatus("REJECT");
          openModal();
        }}
      >
        이번 과외는 넘기기
      </button>
      <MatchingModal
        isOpen={isModalOpen}
        status={matchingStatus}
        title={
          matchingStatus === "ACCEPT"
            ? "신청이 완료됐어요!"
            : "신청을 하지 않는 이유를 알려주세요!"
        }
        message={
          matchingStatus === "ACCEPT"
            ? "선생님의 프로필을 학부모님께 전달드릴게요"
            : ""
        }
        onCloseModal={closeModal}
        onSubmitReject={(reason) => {
          postTutoringReject({
            reason,
            matchingId,
            teacherId,
          });
        }}
      />
    </section>
  );
}
