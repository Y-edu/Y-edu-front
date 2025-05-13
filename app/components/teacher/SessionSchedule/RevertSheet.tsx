import { useSessionMutations } from "@/hooks/mutation/usePatchSessions";
import Button from "@/ui/Button";

export default function RevertSheet({
  sessionId,
  close,
}: {
  sessionId: number;
  close: () => void;
}) {
  const { mutate } = useSessionMutations().revertMutation;

  const handleSubmit = () => {
    mutate({ sessionId });
    close();
  };

  return (
    <>
      <h2 className="mb-[24px] mt-[4px] text-[20px] font-bold">
        학부모님과 상의 후에 <br />
        날짜를 변경했나요?
      </h2>
      <Button onClick={handleSubmit}>네 맞아요</Button>
    </>
  );
}
