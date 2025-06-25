import { getTeacherAllDetails } from "@/actions/get-teacher-all-detail";
import TeacherDetail from "@/components/teacher/TeacherDetail/TeacherDetail";

export default async function TeacherRecommendPage({
  params,
}: {
  params: { token: string };
}) {
  const { token } = params;

  const data = await getTeacherAllDetails({ token });
  return <TeacherDetail data={data} />;
}
