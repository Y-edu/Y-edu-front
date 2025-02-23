import { httpService } from "app/utils/httpService";

export interface TeacherSearchParams {
  districts: string[];
  subjects: string[];
  universities: string[];
  genders: string[];
  search: string;
}

export interface FilteringTeacher {
  teacherId: string;
  nickName: string;
  classTypes: Array<"수학" | "영어">;
  name: string;
  status: "등록중" | "활동중" | "일시정지" | "종료";
  accept: number;
  total: number;
  university: string;
  major: string;
  districts: string[];
  video: string;
  issue: string | null;
}

export interface TeacherSearchResponse {
  filteringTeachers: FilteringTeacher[];
}

export async function getTeacherSearch(
  applicationFormId: string,
  params: TeacherSearchParams,
): Promise<TeacherSearchResponse> {
  const transformedParams = {
    ...params,
    districts: params.districts.join(","),
    subjects: params.subjects.join(","),
    universities: params.universities.join(","),
    genders: params.genders.join(","),
  };

  const response = await httpService.get<TeacherSearchResponse>(
    `/admin/details/matching/search/${applicationFormId}`,
    {
      params: transformedParams,
    },
  );
  return response.data;
}
