import { httpService } from "app/utils/httpService";

interface AdminMatchingRecommendParams {
  classMatchingId: string;
}

export async function getAdminMatchingRecommend(
  params: AdminMatchingRecommendParams,
) {
  const response = await httpService.get<string>(
    `/admin/details/matching/recommend?classMatchingId=${params.classMatchingId}`,
  );

  return response.data;
}
