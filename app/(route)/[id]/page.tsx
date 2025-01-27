import ParentsRequest from "../../components/root/ParentsRequest";
import TeacherList from "../../components/root/TeacherList";
import { Header } from "../../ui";

import { AlimHeader } from "./(_components)/AlimHeader";
import { AlimTable } from "./(_components)/AlimTable";
import ParentsRequest from "./(_components)/ParentsRequest";
import TeacherList from "./(_components)/TeacherList";
import TeacherListFilter from "./(_components)/TeacherListFilter";
import TeacherListSearch from "./(_components)/TeacherListSearch";

export default function MatchingDetailHome({ id }: { id: string }) {
  // 페이지 네이션 처리 필요
  return (
    <div className="flex flex-col">
      <Header matchingId={id} />
      <AlimHeader matchingId={id} />
      <AlimTable matchingId={id} />
      <ParentsRequest />
      <TeacherListFilter />
      <TeacherListSearch />
      <TeacherList />
    </div>
  );
}
