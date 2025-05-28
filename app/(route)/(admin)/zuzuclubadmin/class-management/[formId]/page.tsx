import ClassDetailList from "@/components/admin/ClassDetailList";
import ClassList from "@/components/admin/ClassList";

export default function ClassManagementDetailPage({
  params,
}: {
  params: { formId: string };
}) {
  const { formId } = params;
  const decodedFormId = decodeURIComponent(formId); // 한글 문자열 디코딩

  return (
    <div>
      <h1 className="flex h-[100px] w-full items-center bg-white pl-16 text-[22px] font-bold text-gray-700">
        {decodedFormId}
      </h1>
      <ClassList
        classItems={[
          {
            nickName: "선생님",
            applicationFormId: "강남구11a",
            subject: "수학",
            status: "수업중",
            kakaoName: "학부모",
          },
        ]}
      />
      <ClassDetailList />
    </div>
  );
}
