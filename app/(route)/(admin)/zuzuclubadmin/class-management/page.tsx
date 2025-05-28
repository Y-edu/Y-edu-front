import ClassList from "@/components/admin/ClassList";

export default function ClassManagementHome() {
  return (
    <div>
      <h1 className="flex h-[100px] w-full items-center bg-white pl-16 text-[22px] font-bold text-gray-700">
        수업관리
      </h1>
      <div className="p-4 pt-2">
        <ClassList />
      </div>
    </div>
  );
}
