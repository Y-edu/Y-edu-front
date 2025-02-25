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
  classTypes: Array<string>;
  name: string;
  status: string;
  accept: number;
  total: number;
  university: string;
  major: string;
  districts: string[];
  phoneNumber: string;
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
