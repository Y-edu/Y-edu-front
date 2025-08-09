/**
 * AlimHeader는 알림톡 총 발생 건, 응답 건과 처음 발송 후 얼만큼의 시간이 지났는지를 보여주는 컴포넌트입니다.
 */
"use client";

import { useQueryClient } from "@tanstack/react-query";

import type { AcceptanceSchema } from "@/actions/get-acceptance";
import { useGetAcceptance } from "@/hooks/query";
import { usePostMatchingAcceptance } from "@/hooks/mutation";
import { useModal } from "@/hooks/custom";
import { Modal } from "@/ui";
import { useAlimTableContext } from "@/(route)/(admin)/zuzuclubadmin/[id]/(hooks)/useAlimTable";
import { formatTimetoDate } from "@/utils/formatTimetoDate";
import { useGetAdminMatchingRecommend } from "@/hooks/query/useGetAdminMatchingRecommend";

interface AlimHeaderProps {
  matchingId: string;
}

export function AlimHeader({ matchingId }: AlimHeaderProps) {
  const { data: alimData } = useGetAcceptance(matchingId, 1);
  const { isModalOpen, closeModal, openModal } = useModal(); // "선생님 추천 발송" 모달
  const {
    isModalOpen: isRecommendModalOpen,
    closeModal: closeRecommendModal,
    openModal: openRecommendModal,
  } = useModal(); // "이 선생님과 할래요" 모달
  const { mutate: postMatchingAcceptance } = usePostMatchingAcceptance();
  const { alimTable, rowSelection } = useAlimTableContext();

  const queryClient = useQueryClient();

  const selectedRows = alimTable.getSelectedRowModel().flatRows;
  const selectedRowNickName = selectedRows.map((row) => row.original.nickName);

  // "이 선생님과 할래요"에서 사용할 대상 선생님 정보 가져오기
  const getTargetTeacher = () => {
    if (selectedRows.length === 0) return null;

    /**
     * 1. 선택된 유효한 선생님이 1명이면 해당 선생님
     * 2. 선택된 유효한 선생님이 n명이면 마지막으로 선택된 선생님
     */
    const targetRow = selectedRows[selectedRows.length - 1];
    return {
      classMatchingId: String(targetRow.original.classMatchingId),
      nickName: targetRow.original.nickName,
      status: targetRow.original.status,
    };
  };

  const targetTeacher = getTargetTeacher();
  const { data: adminMatchingRecommend } = useGetAdminMatchingRecommend(
    targetTeacher?.classMatchingId || null,
  );

  const acceptanceQueryMutate = () => {
    const existAcceptanceQueryData = queryClient.getQueryData<AcceptanceSchema>(
      [`/acceptance/${matchingId}/1`],
    );
    const selectedIds = Object.keys(rowSelection).map((v) => v);

    const newQueryData = {
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

    queryClient.setQueryData([`/acceptance/${matchingId}/1`], newQueryData);
  };

  const handleTeacherRecommend = () => {
    if (selectedRows.length === 0) {
      alert("선생님을 먼저 선택해주세요.");
      return;
    }

    if (selectedRows.length > 1) {
      alert("선생님을 1명만 선택해주세요.");
      return;
    }

    if (!targetTeacher) {
      alert("선택된 선생님이 없습니다.");
      return;
    }

    // 매칭 상태가 '전송'인 선생님한테만 '이 선생님과 할래요' 가능
    if (targetTeacher.status !== "전송") {
      alert("학부모에게 전송된 선생님이 아닙니다.");
      return;
    }

    openRecommendModal();
  };

  const handleTeacherConfirm = () => {
    if (!adminMatchingRecommend) {
      alert("추천 링크를 가져오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    // 최종 매칭 페이지 새 탭으로 열기
    if (typeof window !== "undefined") {
      window.open(
        `${window.location.origin}/teacher/recommend/${adminMatchingRecommend}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
    closeRecommendModal();
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
            발송 후 {formatTimetoDate(alimData.time)} 경과
          </span>
        </div>
        <div>
          <button
            onClick={handleTeacherRecommend}
            className="mr-4 rounded bg-orange-400 px-3 py-[6px] font-normal text-white hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-gray-300"
            disabled={
              !(selectedRows.length === 1 && targetTeacher?.status === "전송")
            }
          >
            이 선생님과 할래요
          </button>
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
        </div>

        {/* 선생님 추천 발송 모달 */}
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
            selectedRowNickName.toString().replaceAll("", ""),
          )}
          message="위 선생님을 학부모께 정말 제안하시겠습니까?"
          confirmText="발송하기"
          cancelText="취소하기"
        />

        {/* 이 선생님과 할래요 모달 */}
        <Modal
          isOpen={isRecommendModalOpen}
          handleOnConfirm={handleTeacherConfirm}
          handleOnCancel={closeRecommendModal}
          title="선생님 선택 확인"
          message={`선택된 선생님은 "${targetTeacher?.nickName}"입니다. 이 선생님과 진행하시겠습니까?`}
          confirmText="이 선생님과 할래요"
          cancelText="아니요"
        />
      </div>
    </header>
  );
}
