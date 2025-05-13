export const createSessionActionButtons = () =>
  ({
    BTN_RESCHEDULE: {
      label: "날짜 변경",
      variant: "secondary",
      value: "reschedule",
    },
    BTN_CANCEL: {
      label: "휴강 처리",
      variant: "secondary",
      value: "cancel",
    },
    BTN_CANCEL_RESTORE: {
      label: "휴강 취소하기",
      variant: "outline",
      value: "cancel_restore",
    },
    BTN_COMPLETE: {
      label: "과외 완료",
      variant: "primary",
      value: "complete",
    },
    BTN_VIEW_REVIEW: {
      label: "작성한 리뷰보기",
      variant: "outline",
      value: "view_review",
    },
  }) as const;
