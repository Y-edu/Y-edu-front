import { httpService } from "@/utils/httpService";

interface AdminMatchingRecommendParams {
  classMatchingId: string;
}

export async function getAdminMatchingRecommend(
  params: AdminMatchingRecommendParams,
) {
  const response = await httpService.get<string>(
    `/admin/details/matching/recommend`,
    { params: { classMatchingId: params.classMatchingId } },
  );

  return response.data;
}
