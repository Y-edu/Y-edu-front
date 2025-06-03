/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

import formatDayTimes from "@/utils/formatDayTimes";
import BulletList from "@/ui/List/BulletList";
import { MATCHING_STATUS, type MatchingStatus } from "@/constants/matching";

import { MatchingModal } from "./MatchingModal";
import { MatchingInfo } from "./MatchingInfo";
import IconTitleChip from "./IconTitleChip";
import ProfileInfoBox from "./ProfileInfoBox";

import Layers from "public/images/Eyes.png";
import { useGetTutoring } from "app/hooks/query";
import { useModal } from "app/hooks/custom";
import { usePostTutoringRefuse } from "app/hooks/mutation/usePostTutoringRefuse";
import {
  GOALS_STYLE_ICON,
  GOALS_CONTRACT,
} from "app/constants/goalsIconMapping";

export function MatchingProposal({ token }: { token: string }) {
  const router = useRouter();
  const { data, error } = useGetTutoring({
    token,
  });
  const { openModal, isModalOpen, closeModal } = useModal();
  const [matchingStatus, setMatchingStatus] = useState<"REJECT" | "ACCEPT">(
    "REJECT",
  );
  const [finalStatus, setFinalStatus] = useState<MatchingStatus>(
    data.matchStatus,
  );
  const { mutate: postTutoringReject } = usePostTutoringRefuse();

  if (error) throw error;

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
      <p className="mb-[15px] ml-[16px] mt-[36px] font-pretendard text-lg font-bold leading-[146%] tracking-[-0.02em] text-labelStrong">
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
        matchStatus={data.matchStatus}
        pay={data.pay}
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
          <div className="flex flex-col gap-1">
            <p>
              학부모님이
              <span className="text-primaryNormal"> 선호하는 시간</span>
              이에요.
            </p>
            <p className="text-[15px] font-medium leading-[152%] text-labelAssistive">
              학부모님과 협의하여 시간을 조율할 수 있어요.
            </p>
          </div>
        }
      >
        <BulletList items={formatDayTimes(data.parentDayTimes)} />
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
                router.push(`/teacher/notify/${token}/select-time`);
              }}
            >
              신청할게요
            </button>
          </div>

          <p className="mx-auto my-[20px] flex justify-center text-labelNeutral">
            둘 중 하나를 꼭 선택해주세요!
          </p>
        </>
      )}

      {(
        [
          MATCHING_STATUS.REJECT,
          MATCHING_STATUS.ACCEPT,
          MATCHING_STATUS.SENT,
          MATCHING_STATUS.MATCHING,
          MATCHING_STATUS.FINAL_MATCH,
          MATCHING_STATUS.TUTORING_END,
          MATCHING_STATUS.TEMPORARY_STOP,
          MATCHING_STATUS.STOP,
        ] as MatchingStatus[]
      ).includes(finalStatus) && (
        <div className="mb-6 flex w-full justify-center">
          <button className="h-[58px] w-[89%] cursor-not-allowed rounded-xl bg-statusInactive text-lg font-bold text-labelAssistive">
            {finalStatus === MATCHING_STATUS.REJECT
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
              token,
            },
            {
              onSuccess: () => {
                setMatchingStatus("ACCEPT");
                setFinalStatus(MATCHING_STATUS.REJECT);
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
