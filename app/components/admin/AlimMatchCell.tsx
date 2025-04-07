"use client";

import { useState } from "react";
import type { Row } from "@tanstack/react-table";
import { useQueryClient } from "@tanstack/react-query";

import { AcceptanceSchema } from "@/actions/get-acceptance";
import { postMatchingSchedule } from "@/actions/post-matching-schedule";
import { Modal } from "@/ui";
import cn from "@/utils/cn";
import { useAlimTableContext } from "@/(route)/(admin)/zuzuclubadmin/[id]/(hooks)/useAlimTable";

type RowType = AcceptanceSchema["alarmTalkResponses"]["0"] & {
  receiveAcceptance?: string;
};

export default function MatchCell({ row }: { row: Row<RowType> }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { matchingId } = useAlimTableContext();

  const handleConfirm = async () => {
    try {
      await postMatchingSchedule({
        classMatchingId: String(row.original.classMatchingId),
      });
      const cacheKey = [`/acceptance/${matchingId}/1`];
      const prev = queryClient.getQueryData<AcceptanceSchema>(cacheKey);
      if (prev) {
        const next = {
          ...prev,
          alarmTalkResponses: prev.alarmTalkResponses.map((item) =>
            item.classMatchingId === row.original.classMatchingId
              ? { ...item, status: "매칭" }
              : item,
          ),
        };
        queryClient.setQueryData(cacheKey, next);
      }
      alert("매칭 및 알림톡 전송 완료!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`매칭 실패: ${error.message}`);
      } else {
        alert("매칭 실패: 알 수 없는 오류가 발생했습니다.");
      }
    } finally {
      setModalOpen(false);
    }
  };

  if (row.original.status !== "전송") return null;

  return (
    <>
      <button
        className={cn(
          "rounded px-2 py-0.5 text-xs font-medium",
          "bg-green-600 text-white hover:bg-green-700",
        )}
        onClick={(e) => {
          e.stopPropagation();
          setModalOpen(true);
        }}
      >
        매칭
      </button>

      <Modal
        title="최종 매칭 확인"
        message={`${row.original.nickName} 선생님과 매칭을 확정하시겠습니까?`}
        confirmText="확인"
        cancelText="취소"
        isOpen={isModalOpen}
        handleOnConfirm={handleConfirm}
        handleOnCancel={() => setModalOpen(false)}
      />
    </>
  );
}
