/** 수업관리 탭 테이블 정보 받아오는 액션
 * 타입만 정의해둘게요!
 */

export type ClassStatus = "수업중" | "중단" | "임시중단";

export interface ClassListResponse {
  nickName: string;
  applicationFormId: string;
  subject: string;
  status: ClassStatus;
  kakaoName: string | null;
}

export interface ClassAdditionalInfo {
  startDate: string;
  parentPhoneNumber: string;
  teacherPhoneNumber: string;
  classTime: string;
}
