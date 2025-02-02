export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";

export interface TeacherSimpleDetailsParams {
  teacherId: string;
}

export interface TeacherDetailsParams extends TeacherSimpleDetailsParams {
  subject: "english" | "math";
}

export interface TeacherDetailsTeacherResponse {
  appealPoints: Array<string>;
  comment: string;
  introduce: string;
  teachingHistory: number;
  teachingExperiences: Array<string>;
  university: string;
  major: string;
  highSchool: string;
  teachingStyle1: string;
  teachingStyleInfo1: string;
  teachingStyle2: string;
  teachingStyleInfo2: string;
  recommendStudents: Array<string>;
}

export interface TeacherDetailsClassResponse {
  teachingStyle: string;
  managementStyle: string;
}

export interface TeacherDetailsInfoResponse {
  profile: string;
  nickName: string;
}

export interface TeacherDetailsAvailableResponse {
  districts: Array<string>;
  avaialbeTimes: {
    [key in DayOfWeek]: Array<string>;
  };
}
