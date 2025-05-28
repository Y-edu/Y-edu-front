import ClassList from "@/components/admin/ClassList";

export default function ClassManagementHome() {
  return (
    <div>
      <h1 className="flex h-[100px] w-full items-center bg-white pl-16 text-[22px] font-bold text-gray-700">
        수업관리
      </h1>
      <div className="p-4 pt-2">
        {/* 더미데이터 삭제 후 기능 구현 필요 */}
        <ClassList
          pagination
          classItems={[
            {
              nickName: "선생님",
              applicationFormId: "강남구11a",
              subject: "수학",
              status: "수업중",
              kakaoName: "학부모",
            },
            {
              nickName: "선생님2",
              applicationFormId: "강남구12b",
              subject: "영어",
              status: "중단",
              kakaoName: "학부모2",
            },
            {
              nickName: "선생님3",
              applicationFormId: "강남구13b",
              subject: "영어",
              status: "임시중단",
              kakaoName: "학부모3",
            },
          ]}
        />
      </div>
    </div>
  );
}
