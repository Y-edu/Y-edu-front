import LabelValueList from "@/ui/List/LabelValueList";

export default function ClassManagementDetailPage() {
  const labelValueList = [
    { label: "과목", value: "영어" },
    { label: "수업시수", value: "주2회 50분 / 24만원" },
    { label: "매칭된 선생님", value: "레이첼" },
    { label: "첫 수업 날짜", value: "2025년 4월 12일" },
    { label: "선생님 전화번호", value: "010-1111-2222" },
    { label: "학부모 전화번호", value: "010-2222-3333" },
  ];

  return <LabelValueList items={labelValueList} />;
}
