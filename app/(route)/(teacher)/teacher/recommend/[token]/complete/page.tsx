import { Result } from "@/ui/Result";

function RecommendResultPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Result>
        <Result.Image kind="letter" />
        <Result.Title>매칭 요청이 완료됐어요!</Result.Title>
        <Result.Description>
          수업 안내를 카톡으로 보내드릴게요
        </Result.Description>
      </Result>
    </div>
  );
}

export default RecommendResultPage;
