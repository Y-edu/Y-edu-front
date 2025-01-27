/**
 * AlimHeader는 알림톡 총 발생 건, 응답 건과 처음 발송 후 얼만큼의 시간이 지났는지를 보여주는 컴포넌트입니다.
 */
"use client";

import { useGetAcceptance } from "../../../hooks/query";
import { usePostMatchingAcceptance } from "../../../hooks/mutation";
import { useModal } from "../../../hooks/custom";
import { Modal } from "../../../ui";
import { useAlimTableContext } from "../(hooks)/useAlimTable";

interface AlimHeaderProps {
  matchingId: string;
}

export function AlimHeader({ matchingId }: AlimHeaderProps) {
  const { data: alimData } = useGetAcceptance(matchingId, 1);
  const { isModalOpen, closeModal, openModal } = useModal();
  const { mutate: postMatchingAcceptance } = usePostMatchingAcceptance();
  const { alimTable, rowSelection } = useAlimTableContext();

  const successedAlimDataLength = alimData.data.filter(
    (v) => v.status === "ACCEPTED",
  ).length;

  const selecteddRowNickName = alimTable
    .getSelectedRowModel()
    .flatRows.map((v) => {
      return v.original.nickname;
    });

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
            aria-label={`성공한 알림톡: ${successedAlimDataLength} / ${alimData.data.length}`}
          >
            {`(${successedAlimDataLength} / ${alimData.data.length})`}
          </span>
          <time
            className="tex-sm ml-8 font-medium"
            dateTime={alimData.lastUpdated}
          >
            {alimData.lastUpdated}
          </time>
        </div>
        <button
          onClick={() => {
            openModal();
          }}
          className="min-h-[40px] min-w-[80px] rounded-lg bg-primary p-2 text-white transition duration-300 ease-in-out hover:bg-blue-600 hover:shadow-lg"
        >
          선생님 추천 발송
        </button>
        <Modal
          isOpen={isModalOpen}
          onConfirm={() => {
            postMatchingAcceptance(
              {
                matchingId,
                userIds: Object.keys(rowSelection).map((v) => {
                  return v;
                }),
              },
              {
                onSuccess: (data) => {
                  alert(data.data);
                  closeModal();
                },
                onError: () => {
                  // Todo -> 에러 로깅
                  alert("에러가 발생했습니다.");
                  closeModal();
                },
              },
            );
          }}
          onCancel={closeModal}
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
