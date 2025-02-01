import { useRef, useState } from "react";
import Image from "next/image";

import ModalCloseImage from "../../../public/images/ModalClose.svg";
import { useClickoutside } from "../../hooks/custom";
import type { ModalProps } from "../../ui";

type ModalStatus = "REJECT" | "ACCEPT";

interface BaseMatchingModalProps
  extends Pick<ModalProps, "isOpen" | "message" | "title" | "cancelText"> {
  status: ModalStatus;
  onCloseModal?: () => void;
}

interface AcceptMatchingModalProps extends BaseMatchingModalProps {
  status: "ACCEPT";
}

interface RejectMatchingModalProps extends BaseMatchingModalProps {
  status: "REJECT";
  rejectReason?: string;
  onSubmitReject: (reason: string) => void;
}

type MatchingModalProps = AcceptMatchingModalProps | RejectMatchingModalProps;

export function MatchingModal({ isOpen, ...rest }: MatchingModalProps) {
  const matchingModalRef = useRef<HTMLDivElement | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  useClickoutside(matchingModalRef, rest.onCloseModal);
  const [showETCRejectReason, setShowETCRejectReason] = useState(false);

  if (!isOpen) {
    return null;
  }

  const modalHeight = rest.status === "ACCEPT" ? "h-[112px]" : "min-h-[372px]";
  const activeButtonStyle =
    rejectReason.length > 0
      ? "bg-[#3265FD] text-white"
      : "bg-[#B8B8B8] text-white";

  return (
    <div className="bg-opacity / 36 fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={matchingModalRef}
        className={`flex ${modalHeight} w-[335px] flex-col justify-center gap-[6px] rounded-[14px] bg-white p-[24px] align-middle`}
      >
        <div className="flex w-full justify-end">
          <Image
            src={ModalCloseImage as string}
            width={10}
            height={10}
            onClick={() => rest.onCloseModal?.()}
            className="flex justify-end"
            alt="모달 닫기 버튼"
          />
        </div>
        <h2 className="text-[16px] font-bold text-[#3A3A3A]">{rest.title}</h2>
        {rest.status === "ACCEPT" && (
          <p className="font-md mb-[14px] text-[15px] text-[#777777]">
            {rest.message}
          </p>
        )}
        {rest.status === "REJECT" && (
          <div className="mx-auto mt-[20px] flex w-[287px] flex-col gap-[12px] text-[#3C434F]">
            <label className="flex items-center justify-between">
              가능한 시간이 아니에요
              <input
                className="scale-150"
                type="radio"
                name="rejectReason"
                value="시간이 안 맞아요"
                onChange={(e) => {
                  setShowETCRejectReason(false);
                  setRejectReason(e.target.value);
                }}
              />
            </label>

            <label className="flex items-center justify-between">
              가능한 지역이 아니에요
              <input
                className="scale-150"
                type="radio"
                name="rejectReason"
                value="가능한 지역이 아니에요"
                onChange={(e) => {
                  setShowETCRejectReason(false);
                  setRejectReason(e.target.value);
                }}
              />
            </label>
            <label className="flex items-center justify-between">
              선호하는 선생님과 달라요
              <input
                className="scale-150"
                type="radio"
                name="rejectReason"
                value="선호하는 선생님과 달라요"
                onChange={(e) => {
                  setShowETCRejectReason(false);
                  setRejectReason(e.target.value);
                }}
              />
            </label>
            <label className="flex items-center justify-between">
              현재 수업이 불가한 상태에요
              <input
                className="scale-150"
                type="radio"
                name="rejectReason"
                value="현재 수업이 불가한 상태에요"
                onChange={(e) => {
                  setShowETCRejectReason(false);
                  setRejectReason(e.target.value);
                }}
              />
            </label>
            <label className="flex items-center justify-between">
              기타
              <input
                className="scale-150"
                type="radio"
                name="rejectReason"
                value="기타"
                onChange={() => setShowETCRejectReason(true)}
              />
            </label>
            {showETCRejectReason && (
              <textarea
                placeholder="이유를 입력해주세요."
                className="h-[86px] w-[287px] resize-none rounded-[8px] border-2 p-2 font-[14px] text-black"
                onChange={(e) => setRejectReason(e.target.value)}
              />
            )}

            <button
              onClick={() => {
                rest.onSubmitReject?.(rejectReason);
              }}
              disabled={rejectReason.length === 0}
              className={`mt-[36px] h-[54px] w-[287px] rounded-[8px] ${activeButtonStyle}`}
            >
              제출하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
