"use client";

import {
  usePathname,
  useParams,
  useSearchParams,
  useRouter,
} from "next/navigation";
import { useMemo, useState } from "react";

import { useGetParentsSessionsByPhone } from "@/hooks/query/useGetParentsSessionsByPhoneNumber";
import { usePostParentsSessionActions } from "@/hooks/mutation/usePostParentsSessionActions";
import type { SessionActionsType } from "@/actions/post-parents-session-actions";
import TitleSection from "@/ui/TitleSection";
import Button from "@/ui/Button";
import ParentSessionListCard from "@/ui/Card/ParentSessionListCard";

export default function SessionActions() {
  const router = useRouter();
  const pathname = usePathname();
  const { phoneNumber } = useParams<{ phoneNumber: string }>();
  const searchParams = useSearchParams();
  const appKey = searchParams.get("appKey");

  const segments = pathname.split("/").filter(Boolean);
  const actionStr = segments.at(-1) === "change" ? "change" : "pause";
  const actionType: SessionActionsType =
    actionStr === "pause" ? "PAUSE" : "CHANGE_TEACHER";

  const { data } = useGetParentsSessionsByPhone(phoneNumber);
  const mutation = usePostParentsSessionActions();

  const targetClass = useMemo(() => {
    if (!data || !appKey) return null;

    // appKey를 "applicationFormId_index"로 분리
    const [appId, rawIndex] = appKey.split("__");
    const idx = Number(rawIndex ?? -1);

    // applicationFormId가 같은 항목만 필터링
    const candidates = data.filter((item) => item.applicationFormId === appId);

    // 같은 applicationFormId만 필터링 후 index번째 항목 선택
    return idx >= 0 ? candidates[idx] : (candidates[0] ?? null);
  }, [data, appKey]);

  const [selectedSessionId, setSelectedSessionId] = useState<number | null>(
    null,
  );
  const isButtonDisabled = !selectedSessionId;

  const handleSubmit = () => {
    if (!selectedSessionId || !targetClass) return;

    mutation.mutate(
      { phoneNumber, sessionId: selectedSessionId, type: actionType },
      {
        onSuccess: () => {
          const sp = new URLSearchParams({
            action: actionStr,
            applicationFormId: targetClass.applicationFormId,
            teacherNickname: targetClass.teacherNickname,
          });

          router.push(
            `/parents/session-actions/${phoneNumber}/submit?${sp.toString()}`,
          );
        },
      },
    );
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mb-5 flex flex-col gap-10">
        <TitleSection>
          <TitleSection.Title className="text-[24px]">
            언제까지 수업을 진행할까요?
          </TitleSection.Title>
          <TitleSection.Description className="text-[16px]">
            {actionStr === "pause"
              ? "일시정지 전, 마지막 수업을 선택해주세요"
              : "교체 전, 마지막 수업을 선택해주세요"}
          </TitleSection.Description>
        </TitleSection>

        {/* 세션 카드 목록 */}
        <div className="flex flex-col gap-4 pb-20">
          {targetClass?.sessions?.map((s) => {
            const selected = selectedSessionId === s.sessionId;
            return (
              <button
                key={s.sessionId}
                type="button"
                onClick={() => setSelectedSessionId(s.sessionId)}
                className="w-full text-left transition-all"
              >
                <ParentSessionListCard
                  date={new Date(s.sessionDate)}
                  roundNumber={s.roundNumber}
                  className={
                    selected
                      ? "rounded-[12px] border border-primary bg-primaryTint shadow-[0_4px_24px_0_rgba(0,0,0,0.05)]"
                      : ""
                  }
                />
              </button>
            );
          })}

          {!targetClass && (
            <div className="text-gray-500">
              수업 정보를 불러오지 못했습니다.
            </div>
          )}
        </div>

        <div className="fixed inset-x-0 bottom-0 flex justify-center bg-white p-4 shadow-lg">
          <Button
            className="w-[375px]"
            disabled={isButtonDisabled}
            onClick={handleSubmit}
          >
            완료하기
          </Button>
        </div>
      </div>
    </div>
  );
}
