"use client";
import { ReactNode, useState } from "react";

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

  const [rejectSuccessMessage, setRejectSuccessMessage] = useState<{
    title: ReactNode;
    content: ReactNode;
  }>({
    title: "신청이 완료됐어요.",
    content: "선생님의 프로필을 학부모님께 전달드릴게요",
  });

  const modalTitle =
    matchingStatus === "ACCEPT"
      ? rejectSuccessMessage.title
      : "넘기는 이유를 알려주세요.";

  const modalSubTitle =
    matchingStatus === "ACCEPT" ? rejectSuccessMessage.content : "";
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
      <ProfileInfoBox
        title={
          <p>
            이런 <span className="text-primaryNormal">목적</span>에 집중하고
            싶어요.
          </p>
        }
      >
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
      <ProfileInfoBox
        title={
          <p>
            학부모님이{" "}
            <span className="text-primaryNormal">선호하는 선생님</span>
            이에요.
          </p>
        }
      >
        {data.data.favoriteCondition}
      </ProfileInfoBox>
      <div className="order-2 h-[10px] w-[375px] flex-none self-stretch bg-[#F5F5F5]" />
      <ProfileInfoBox
        title={
          <p>
            학부모님이 <span className="text-primaryNormal">선호하는 시간</span>
            이에요.
          </p>
        }
      >
        {data.data.wantTime}
      </ProfileInfoBox>
      <div className="flex justify-center gap-[15px] align-middle">
        <button
          className="order-0 flex h-[58px] w-[160px] flex-none flex-row items-center justify-center gap-[6px] self-stretch rounded-[8px] bg-primaryTint p-[16px] font-bold text-primaryNormal"
          onClick={() => {
            setMatchingStatus("REJECT");
            openModal();
          }}
        >
          이번건 넘길게요
        </button>
        <button
          className="order-0 flex h-[58px] w-[160px] flex-none flex-row items-center justify-center gap-[6px] self-stretch rounded-[8px] bg-primaryNormal p-[16px] px-[36px] font-bold text-white"
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
      </div>

      <p className="mx-auto my-[20px] flex justify-center">
        둘 중 하나를 꼭 선택해주세요!
      </p>
      <MatchingModal
        isOpen={isModalOpen}
        status={matchingStatus}
        title={modalTitle}
        message={modalSubTitle}
        onCloseModal={closeModal}
        onSubmitReject={(reason) => {
          postTutoringReject(
            {
              reason,
              matchingId,
              teacherId,
            },
            {
              onSuccess: () => {
                setMatchingStatus("ACCEPT");
                setRejectSuccessMessage({
                  title: "이번 과외는 넘길게요!",
                  content:
                    "희망하지 않는 지역이나 과목의 과외건이 \n 반복전송된다면 고객센터를 통해 알려주세요.",
                });
              },
            },
          );
        }}
      />
    </section>
  );
}
