import Button from "@/ui/Button";

export default function RejectedResult() {
  return (
    <div className="relative flex h-full flex-col gap-[40px]">
      <div className="flex flex-col gap-[8px]">
        <p className="text-[24px] font-bold">
          수업을 진행하지 않게 된 <br />
          이유가 있을까요?
        </p>
        <p className="text-[16px] font-medium text-grey-400">
          적어주시면 다음 매칭에 잘 반영해드릴게요
        </p>
      </div>
      <textarea
        placeholder="예: 일정이 맞지 않았어요 / 스타일이 달랐어요"
        className="min-h-[104px] w-full rounded-[12px] border border-grey-200 p-[16px] text-[16px] placeholder:text-grey-400 focus:outline-none"
      />
      <div className="absolute bottom-0 w-full">
        <Button>제출하기</Button>
      </div>
    </div>
  );
}
