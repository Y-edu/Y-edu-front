import { useState } from "react";

import Button from "@/ui/Button";
import Radio from "@/ui/Radio";
import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";
import { CANCEL_TEXT } from "@/constants/session/cancel";
import { CancelReason } from "@/actions/patch-sessions";

export function NotSameDayCancelSheet({
  sessionId,
  close,
}: {
  sessionId: number;
  close: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [selected, setSelected] = useState<CancelReason>("TOGETHER");

  const { mutate } = useSessionMutations().cancelMutation;

  const CANCEL_REASON = [
    { value: "PARENT", label: "학부모 요청" },
    { value: "TEACHER", label: "선생님 요청" },
  ] as const;

  const handleSubmit = () => {
    mutate({ sessionId, reason: selected, isTodayCancel: false });
    close();
  };

  return (
    <>
      {!confirmed && (
        <>
          <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
            학부모님과 상의 후에 <br />
            휴강을 결정했나요?
          </h2>
          <Button onClick={() => setConfirmed(true)}>네 맞아요</Button>
        </>
      )}
      {confirmed && (
        <>
          <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
            휴강 사유를 선택해주세요.
          </h2>
          <div className="mb-[40px] flex flex-col gap-[32px]">
            {CANCEL_REASON.map(({ value, label }) => (
              <Radio
                key={value}
                label={label}
                selected={selected === value}
                onClick={() => setSelected(value)}
              />
            ))}
          </div>

          <Button disabled={!selected} onClick={handleSubmit}>
            완료하기
          </Button>
        </>
      )}
    </>
  );
}

export function SameDayCancelSheet({
  close,
  onRequestCancel,
}: {
  close: () => void;
  onRequestCancel: (reason: CancelReason) => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [selected, setSelected] = useState<CancelReason>("TOGETHER");

  const CANCEL_REASONS = [
    {
      value: "TOGETHER",
      label: CANCEL_TEXT.NOT_SAME_DAY_CANCEL,
      description: "",
    },
    {
      value: "PARENT",
      label: CANCEL_TEXT.SAME_DAY_CANCEL_BY_PARENTS_LONG,
      description: CANCEL_TEXT.SAME_DAY_CANCEL_BY_PARENTS_DESC,
    },
    {
      value: "TEACHER",
      label: CANCEL_TEXT.SAME_DAY_CANCEL_BY_TEACHER_LONG,
      description: CANCEL_TEXT.SAME_DAY_CANCEL_BY_TEACHER_DESC,
    },
  ] as const;

  const handleSubmit = () => {
    onRequestCancel(selected);
    close();
  };

  return (
    <>
      {!confirmed && (
        <>
          <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
            학부모님과 상의 후에 <br />
            휴강을 결정했나요?
          </h2>
          <Button onClick={() => setConfirmed(true)}>네 맞아요</Button>
        </>
      )}
      {confirmed && (
        <>
          <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
            휴강 사유를 선택해주세요.
          </h2>
          <div className="mb-[40px] flex flex-col gap-[32px]">
            {CANCEL_REASONS.map(({ value, label, description }) => (
              <Radio
                key={value}
                label={
                  <div className="flex flex-col">
                    <div className="flex-start flex text-gray-700">{label}</div>
                    {description && (
                      <div className="text-sm text-primary">{description}</div>
                    )}
                  </div>
                }
                selected={selected === value}
                onClick={() => setSelected(value)}
              />
            ))}
          </div>

          <Button disabled={!selected} onClick={handleSubmit}>
            완료하기
          </Button>
        </>
      )}
    </>
  );
}
