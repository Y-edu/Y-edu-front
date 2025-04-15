import { useRouter } from "next/navigation";

import Button from "@/ui/Button";

export default function OnBoarding() {
  const router = useRouter();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-[40px] pb-[48px]">
      <p className="text-center text-[24px] font-bold">
        전화 상담 후<br /> 수업이 확정되었나요?
      </p>
      <div className="flex w-full flex-col gap-[4px]">
        <Button onClick={() => router.push(`?step=confirmed`)}>
          네, 확정됐어요
        </Button>
        <Button
          onClick={() => router.push(`?step=rejected`)}
          className="bg-white text-grey-500"
        >
          조율 중 수업이 취소됐어요
        </Button>
      </div>
    </div>
  );
}
