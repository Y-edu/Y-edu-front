import { useState } from "react";

import Button from "@/ui/Button";
import Radio from "@/ui/Radio";
import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";

export default function CancelSheet({
  sessionId,
  close,
}: {
  sessionId: number;
  close: () => void;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [selected, setSelected] = useState("");

  const { mutate } = useSessionMutations().cancelMutation;

  const REASONS = ["학부모 요청", "선생님 요청"] as const;

  const handleSubmit = () => {
    mutate({ sessionId, reason: selected });
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
            {REASONS.map((reason) => (
              <Radio
                key={reason}
                label={reason}
                selected={selected === reason}
                onClick={() => setSelected(reason)}
              />
            ))}
          </div>

          <Button onClick={handleSubmit}>완료하기</Button>
        </>
      )}
    </>
  );
}
