import { httpService } from "app/utils/httpService";

export type DayOfWeek = "월" | "화" | "수" | "목" | "금" | "토" | "일";
export type SubjectType = "english" | "math";

export interface TeacherSimpleDetailsParams {
  teacherId: string;
}

export interface TeacherDetailsParams extends TeacherSimpleDetailsParams {
  subject: SubjectType;
}

export interface TeacherDetailsTeacherResponse {
  comment: string;
  introduce: string;
  teachingHistory: number;
  teachingExperiences: Array<string>;
  foreignExperiences?: Array<string>;
  university: string;
  major: string;
  highSchool: string;
  teachingStyle1: string;
  teachingStyleInfo1: string;
  teachingStyle2: string;
  teachingStyleInfo2: string;
}

export interface TeacherDetailsClassResponse {
  teachingStyle: string;
  video?: string;
}

export interface TeacherDetailsAvailableResponse {
  districts: Array<string>;
  availables: {
    [key in DayOfWeek]: Array<string>;
  };
}

export interface TeacherDetailsInfoResponse {
  data: {
    profile: string;
    nickName: string;
  };
}

/** '선생님' 탭 정보 */
export async function getTeacherDetailsTeacher(
  params: TeacherDetailsParams,
): Promise<TeacherDetailsTeacherResponse> {
  const { teacherId, subject } = params;

  const res = await httpService.get<TeacherDetailsTeacherResponse>(
    `/teacher/details/${subject}/teacher/${teacherId}`,
  );
  return res.data;
}

/** '수업' 탭 정보 */
export async function getTeacherDetailsClass(
  params: TeacherDetailsParams,
): Promise<TeacherDetailsClassResponse> {
  const { teacherId, subject } = params;

  const res = await httpService.get<TeacherDetailsClassResponse>(
    `/teacher/details/${subject}/class/${teacherId}`,
  );
  return res.data;
}

/** '지역/시간' 탭 정보 */
export async function getTeacherDetailsAvailable(
  params: TeacherSimpleDetailsParams,
): Promise<TeacherDetailsAvailableResponse> {
  const { teacherId } = params;

  const res = await httpService.get<TeacherDetailsAvailableResponse>(
    `/teacher/details/available/${teacherId}`,
  );
  return res.data;
}

/** 프로필 사진 및 닉네임 정보 */
export function getTeacherDetailsInfo(
  params: TeacherSimpleDetailsParams,
): Promise<TeacherDetailsInfoResponse> {
  const { teacherId } = params;

  return httpService.get(`/teacher/details/info/${teacherId}`);
}
