import Link from "next/link";

import ParentsRequest from "../components/root/ParentsRequest";
import TeacherTable from "../components/root/TeacherList";

export default function Home() {
  return (
    <div className="p-4 pt-2 font-pretendard">
      <Link href="/12">멘토링 디테일</Link>
      <ParentsRequest />
      <TeacherTable />
    </div>
  );
}
