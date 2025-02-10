/**
 * AlimHeader는 알림톡 총 발생 건, 응답 건과 처음 발송 후 얼만큼의 시간이 지났는지를 보여주는 컴포넌트입니다.
 */
"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { AcceptanceSchema } from "../../actions/get-acceptance";
import { useGetAcceptance } from "../../hooks/query";
import { usePostMatchingAcceptance } from "../../hooks/mutation";
import { useModal } from "../../hooks/custom";
import { Modal } from "../../ui";
import { useAlimTableContext } from "../../(route)/(admin)/zuzuclubadmin/[id]/(hooks)/useAlimTable";

interface AlimHeaderProps {
  matchingId: string;
}

export function AlimHeader({ matchingId }: AlimHeaderProps) {
  const { data: alimData } = useGetAcceptance(matchingId, 1);
  const { isModalOpen, closeModal, openModal } = useModal();
  const { mutate: postMatchingAcceptance } = usePostMatchingAcceptance();
  const { alimTable, rowSelection } = useAlimTableContext();

  const queryClient = useQueryClient();

  const selecteddRowNickName = alimTable
    .getSelectedRowModel()
    .flatRows.map((v) => {
      return v.original.nickName;
    });

  const acceptanceQueryMutate = () => {
    const existAcceptanceQueryData = queryClient.getQueryData<AcceptanceSchema>(
      [`/acceptance/${matchingId}/1`],
    );
    const selectedIds = Object.keys(rowSelection).map((v) => v);

    const newQuedyData = {
      ...existAcceptanceQueryData,
      alarmTalkResponses: existAcceptanceQueryData?.alarmTalkResponses?.map(
        (alarm) => {
          if (selectedIds.includes(String(alarm.classMatchingId))) {
            return {
              ...alarm,
              status: "전송",
            };
          } else {
            return alarm;
          }
        },
      ),
    };

    queryClient.setQueryData([`/acceptance/${matchingId}/1`], newQuedyData);
  };

  return (
    <header className="mt-2 p-4">
      <div
        className="flex w-full justify-between text-lg font-bold text-headColor"
        aria-live="polite"
      >
        <div className="flex">
          알림톡 발송
          <span
            className="ml-4"
            aria-label={`성공한 알림톡: ${alimData.accept} / ${alimData.total}`}
          >
            {`(${alimData.accept} / ${alimData.total})`}
          </span>
          <span className="tex-sm ml-8 font-medium" suppressHydrationWarning>
            발송 후 {alimData.time}분 경과
          </span>
        </div>
        <button
          onClick={() => {
            if (Object.keys(rowSelection).length === 0) {
              alert("학부모에게 추천할 선생님을 선택해주세요.");
              return;
            }
            openModal();
          }}
          className="mr-4 rounded bg-primary px-3 py-[6px] font-normal text-white hover:bg-[#4762B4]"
        >
          선생님 추천 발송
        </button>
        <Modal
          isOpen={isModalOpen}
          handleOnConfirm={() => {
            postMatchingAcceptance(
              {
                classMatchingIds: Object.keys(rowSelection).map((v) => {
                  return v;
                }),
              },
              {
                onSuccess: () => {
                  alert("발송에 성공했습니다.");
                  closeModal();
                  acceptanceQueryMutate();
                },
                onError: () => {
                  // Todo -> 에러 로깅
                  alert("에러가 발생했습니다.");
                  closeModal();
                },
              },
            );
          }}
          handleOnCancel={closeModal}
          title={JSON.stringify(
            selecteddRowNickName.toString().replaceAll("", ""),
          )}
          message="위 선생님을 학부모께 정말 제안하시겠습니까?"
          confirmText="발송하기"
          cancelText="취소하기"
        />
      </div>
    </header>
  );
}
