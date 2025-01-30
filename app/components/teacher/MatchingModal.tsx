import { useRef, useState } from "react";

import { useClickoutside } from "../../hooks/custom";
import type { ModalProps } from "../../ui";

interface MatchingModalProps
  extends Pick<ModalProps, "isOpen" | "message" | "title" | "cancelText"> {
  status: "REJECT" | "ACCEPT";
  rejectReason?: string;
  handleOnCancel?: (rejectreason: string) => void;
  onCloseModal?: () => void;
}

export function MatchingModal({ isOpen, ...rest }: MatchingModalProps) {
  const matchingModalRef = useRef<HTMLDivElement | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  useClickoutside(matchingModalRef, rest.onCloseModal);

  if (!isOpen) {
    return null;
  }

  const modalHeight = rest.status === "ACCEPT" ? "h-[112px]" : "h-[255px]";

  return (
    <div className="bg-opacity / 36 fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={matchingModalRef}
        className={`flex ${modalHeight} w-[335px] flex-col justify-center gap-[6px] rounded-[14px] bg-white px-[24px] py-[30px] align-middle`}
      >
        <h2 className="text-[16px] font-bold text-[#3A3A3A]">{rest.title}</h2>
        {rest.status === "ACCEPT" && (
          <p className="font-md text-[15px] text-[#777777]">{rest.message}</p>
        )}
        {rest.status === "REJECT" && (
          <div className="mt-2 flex flex-col gap-[20px]">
            <textarea
              placeholder="이유를 입력해주세요."
              className="h-[86px] w-[287px] resize-none rounded-[8px] border-2 p-2 font-[14px] text-black"
              onChange={(e) => setRejectReason(e.target.value)}
            />
            <button
              onClick={() => rest.handleOnCancel?.(rejectReason)}
              className="h-[50px] w-[138px] rounded-[8px] bg-[#B8B8B8] text-white"
            >
              제출하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
