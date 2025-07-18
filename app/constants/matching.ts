export const MATCHING_STATUS = {
  FINAL_MATCH: "최종매칭",
  TEMPORARY_STOP: "일시중단",
  STOP: "중단",
  MATCHING: "매칭",
  PAYMENT: "입금단계",
  SENT: "전송",
  ACCEPT: "수락",
  WAITING: "대기",
  REJECT: "거절",
  TUTORING_END: "과외결렬",
} as const;

export const CLASS_STATUS_OPTIONS = ["최종매칭", "일시중단", "중단"] as const;

export const MATCHING_STATUS_ORDER = {
  [MATCHING_STATUS.FINAL_MATCH]: 0,
  [MATCHING_STATUS.TEMPORARY_STOP]: 1,
  [MATCHING_STATUS.STOP]: 2,
  [MATCHING_STATUS.MATCHING]: 3,
  [MATCHING_STATUS.PAYMENT]: 4,
  [MATCHING_STATUS.SENT]: 5,
  [MATCHING_STATUS.ACCEPT]: 6,
  [MATCHING_STATUS.WAITING]: 7,
  [MATCHING_STATUS.REJECT]: 8,
  [MATCHING_STATUS.TUTORING_END]: 9,
} as const;

export type MatchingStatus =
  (typeof MATCHING_STATUS)[keyof typeof MATCHING_STATUS];

export type ClassStatus = (typeof CLASS_STATUS_OPTIONS)[number];
