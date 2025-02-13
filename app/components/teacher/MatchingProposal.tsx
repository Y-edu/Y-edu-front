/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { ReactNode, useState } from "react";

import Layers from "../../../public/images/Eyes.png";
import { useGetTutoring } from "../../hooks/query";
import { useModal } from "../../hooks/custom";
import { usePostTutoringAccept } from "../../hooks/mutation/usePostTutoringAccept";
import { usePostTutoringRefuse } from "../../hooks/mutation/usePostTutoringRefuse";
import {
  GOALS_STYLE_ICON,
  GOALS_CONTRACT,
} from "../../constants/goalsIconMapping";

import { MatchingModal } from "./MatchingModal";
import { MatchingInfo } from "./MatchingInfo";
import IconTitleChip from "./IconTitleChip";
import ProfileInfoBox from "./ProfileInfoBox";

interface MatchingProposalProps {
  teacherId: string;
  phoneNumber: string;
  applcationFormId: string;
}

export function MatchingProposal({
  teacherId,
  phoneNumber,
  applcationFormId,
}: MatchingProposalProps) {
  const { data } = useGetTutoring({
    teacherId,
    applcationFormId,
    phoneNumber,
  });
  const { openModal, isModalOpen, closeModal } = useModal();
  const [matchingStatus, setMatchingStatus] = useState<"REJECT" | "ACCEPT">(
    "REJECT",
  );
  const [finalStatus, setFinalStatus] = useState<
    "거절" | "대기" | "전송" | "수락"
  >(data.matchStatus);
  const { mutate: postTutoringAccept } = usePostTutoringAccept();
  const { mutate: postTutoringReject } = usePostTutoringRefuse();

  const [rejectSuccessMessage, setRejectSuccessMessage] = useState<{
    title: ReactNode;
    content: ReactNode;
  }>({
    title: "신청이 완료됐어요!",
    content: "선생님의 프로필을 학부모님께 전달드릴게요.",
  });

  const modalTitle =
    matchingStatus === "ACCEPT"
      ? rejectSuccessMessage.title
      : "신청하지 않으시는 이유를 알려주세요.";

  const modalSubTitle =
    matchingStatus === "ACCEPT" ? rejectSuccessMessage.content : "";

  return (
    <section className="font-pretendard">
      <p className="mb-[15px] ml-[16px] mt-[36px] font-pretendard text-lg font-bold leading-[146%] tracking-[-0.02em] text-gray-800">
        <span className="text-primaryNormal">{data.applicationFormId}</span>{" "}
        과외건
      </p>
      <MatchingInfo
        applicationFormId={String(data.applicationFormId)}
        classType={data.classType}
        age={data.age}
        classCount={data.classCount}
        classTime={data.classTime}
        online={data.online}
        district={data.district}
        dong={data.dong}
        goals={data.goals}
        favoriteStyle={data.favoriteStyle}
        favoriteTime={data.favoriteTime}
        matchStatus={data.matchStatus}
      />
      <ProfileInfoBox
        title={
          <p>
            이런 <span className="text-primaryNormal">목적</span>에 집중하고
            싶어요.
          </p>
        }
      >
        <div className="flex flex-wrap gap-[12px]">
          {data.goals.map((goal, index) => (
            <IconTitleChip
              key={index + goal}
              title={GOALS_CONTRACT[`${goal}`] ?? goal}
              icon={GOALS_STYLE_ICON?.[`${goal}`] ?? Layers}
            />
          ))}
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
        {data.favoriteStyle}
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
        {data.favoriteTime}
      </ProfileInfoBox>
      {finalStatus === "대기" && (
        <>
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
                setFinalStatus("수락");
                openModal();
                postTutoringAccept({
                  teacherId,
                  applicationFormId: data.applicationFormId,
                  phoneNumber,
                });
              }}
            >
              신청하기
            </button>
          </div>

          <p className="mx-auto my-[20px] flex justify-center text-labelNeutral">
            둘 중 하나를 꼭 선택해주세요!
          </p>
        </>
      )}

      {["거절", "수락", "전송"].includes(finalStatus) && (
        <div className="mb-6 flex w-full justify-center">
          <button className="h-[58px] w-[89%] cursor-not-allowed rounded-xl bg-statusInactive text-lg font-bold text-labelAssistive">
            {finalStatus === "거절"
              ? "이미 넘긴 수업입니다."
              : "이미 수락한 수업입니다."}
          </button>
        </div>
      )}

      <MatchingModal
        isOpen={isModalOpen}
        status={matchingStatus}
        title={modalTitle}
        message={modalSubTitle}
        onCloseModal={closeModal}
        onSubmitReject={(reason) => {
          postTutoringReject(
            {
              refuseReason: reason,
              applicationFormId: data.applicationFormId,
              phoneNumber,
              teacherId,
            },
            {
              onSuccess: () => {
                setMatchingStatus("ACCEPT");
                setFinalStatus("거절");
                setRejectSuccessMessage({
                  title: "이번 과외는 넘길게요!",
                  content:
                    "희망하지 않는 지역이나 과목의 과외건이 \n 반복 전송된다면 고객센터를 통해 알려주세요.",
                });
              },
            },
          );
        }}
      />
    </section>
  );
}
