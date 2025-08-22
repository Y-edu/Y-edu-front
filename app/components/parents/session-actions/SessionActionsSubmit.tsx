"use client";

import { useSearchParams } from "next/navigation";

import { Result } from "@/ui/Result";
import Button from "@/ui/Button";

export default function SessionActionSubmit() {
  const searchParams = useSearchParams();

  const action = searchParams.get("action");
  const applicationFormId = decodeURIComponent(
    searchParams.get("applicationFormId") ?? "",
  );
  const teacherNickname = decodeURIComponent(
    searchParams.get("teacherNickname") ?? "",
  );

  const { title, description } =
    action === "pause"
      ? {
          title: `${applicationFormId} ${teacherNickname} 수업이\n일시정지 되었어요`,
          description: "수업을 다시 재개하고 싶다면\nY-edu에 문의해 주세요.",
        }
      : {
          title: `${applicationFormId} 수업의 선생님\n교체 신청이 접수되었어요`,
          description:
            "신규 선생님 매칭을 위해\n아래 '매칭 신청서' 작성을 꼭 부탁드려요",
        };

  const handleMove = () => {
    window.location.href = "https://tally.so/r/mRN4al";
  };

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center pb-[88px] text-center">
        <Result>
          <Result.Image kind="document" />
          <Result.Title>{title}</Result.Title>
          <Result.Description>{description}</Result.Description>
        </Result>
      </div>

      {action === "change" && (
        <div className="fixed inset-x-0 bottom-0 flex justify-center bg-white p-4 shadow-lg">
          <Button className="w-[375px]" onClick={handleMove}>
            매칭 신청서 쓰러가기
          </Button>
        </div>
      )}
    </>
  );
}
