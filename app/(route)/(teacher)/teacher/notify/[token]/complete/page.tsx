import { Result } from "@/ui/Result";

function NotifyResultPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Result>
        <Result.Image kind="letter" />
        <Result.Title>매칭 신청이 완료됐어요!</Result.Title>
        <Result.Description>
          {`매칭이 성사되면\n카톡으로 알려드릴게요`}
        </Result.Description>
      </Result>
    </div>
  );
}

export default NotifyResultPage;
