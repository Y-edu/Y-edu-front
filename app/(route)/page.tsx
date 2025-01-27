import Link from "next/link";

import ParentsRequest from "../components/root/ParentsRequest";
import TeacherList from "../components/root/TeacherList";
import TeacherListFilter from "../components/root/TeacherListFilter";
import TeacherListSearch from "../components/root/TeacherListSearch";
import ParentsList from "../components/root/ParentsList";

export default function Home() {
  return (
    <div className="p-4 pt-2 font-pretendard">
      <Link href="/12">멘토링 디테일</Link>
      <ParentsList />
      <ParentsRequest />
      <TeacherListFilter />
      <TeacherListSearch />
      <TeacherList />
    </div>
  );
}
