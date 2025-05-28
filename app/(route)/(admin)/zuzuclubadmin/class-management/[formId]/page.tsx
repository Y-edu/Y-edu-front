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
    </div>
  );
}
