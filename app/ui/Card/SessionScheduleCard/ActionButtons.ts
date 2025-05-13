import type { ActionButton } from "@/ui/Card/SessionScheduleCard";

export const BTN_RESCHEDULE: ActionButton = {
  label: "날짜 변경",
  variant: "secondary",
  value: "reschedule",
};

export const BTN_CANCEL: ActionButton = {
  label: "휴강 처리",
  variant: "secondary",
  value: "cancel",
};

export const BTN_CANCEL_RESTORE: ActionButton = {
  label: "휴강 취소하기",
  variant: "outline",
  value: "cancel_restore",
};

export const BTN_COMPLETE: ActionButton = {
  label: "과외 완료",
  variant: "primary",
  value: "complete",
};

export const BTN_VIEW_REVIEW: ActionButton = {
  label: "작성한 리뷰보기",
  variant: "outline",
  value: "view_review",
};
