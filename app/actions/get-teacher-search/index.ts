import { httpService } from "../../utils/httpService";

export interface TeacherSearchParams {
  districts: string[];
  subjects: string[];
  universities: string[];
  genders: string[];
  search: string;
}

export interface FilteringTeacher {
  teacherId: number;
  nickName: string;
  classTypes: Array<"수학" | "영어">;
  name: string;
  status: "등록중" | "활동중" | "일시정지" | "종료";
  accept: number;
  total: number;
  university: string;
  districts: string[];
  issue: string | null;
  video: string;
}

export interface TeacherSearchResponse {
  filteringTeachers: FilteringTeacher[];
}

export async function getTeacherSearch(
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
    "/admin/details/matching/search",
    {
      params: transformedParams,
    },
  );
  return response.data;
}
