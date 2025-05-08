import { ActionButton } from "@/ui/Card";

export const defaultActions: Record<string, ActionButton[]> = {
  scheduled: [
    {
      label: "날짜 변경",
      variant: "secondary",
      handleOnClick: () => {
        alert("날짜 변경 모달 열기.");
      },
    },
    {
      label: "휴강",
      variant: "secondary",
      handleOnClick: () => {
        alert("휴강 처리.");
      },
    },
  ],
  ongoing: [
    {
      label: "과외 마치기",
      variant: "primary",
      handleOnClick: () => {
        alert("수업을 완료 처리합니다.");
      },
    },
    {
      label: "날짜 변경",
      variant: "secondary",
      handleOnClick: () => {
        alert("날짜 변경 모달 열기.");
      },
    },
    {
      label: "휴강",
      variant: "secondary",
      handleOnClick: () => {
        alert("휴강 처리.");
      },
    },
  ],
  completed: [
    {
      label: "작성한 리뷰보기",
      variant: "primary",
      handleOnClick: () => {
        alert("작성된 리뷰를 확인합니다.");
      },
    },
  ],
};
