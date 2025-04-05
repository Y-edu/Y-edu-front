import Button from "@/ui/Button";

interface OnBoardingProps {
  onNext: (step: "confirmed" | "rejected") => void;
}
export default function OnBoarding({ onNext }: OnBoardingProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[40px]">
      <p className="text-center text-[24px] font-bold">
        전화 상담 후<br /> 첫 수업일이 정해졌나요?
      </p>
      <div className="flex w-full flex-col gap-[4px]">
        <Button onClick={() => onNext("confirmed")}>네, 정해졌어요</Button>
        <Button
          onClick={() => onNext("rejected")}
          className="bg-white text-grey-500"
        >
          조율 중 수업이 취소됐어요
        </Button>
      </div>
    </div>
  );
}
