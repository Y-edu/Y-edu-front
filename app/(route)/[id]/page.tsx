import { Header } from "../../ui";

import { Alim } from "./(_components)/Alim";
import ParentsRequest from "./(_components)/ParentsRequest";
import TeacherList from "./(_components)/TeacherList";
import TeacherListFilter from "./(_components)/TeacherListFilter";
import TeacherListSearch from "./(_components)/TeacherListSearch";

export default function MatchingDetailHome({ id }: { id: string }) {
  // 페이지 네이션 처리 필요
  return (
    <div className="flex flex-col">
      <Header matchingId={id} />
      <Alim />
      <ParentsRequest />
      <TeacherListFilter />
      <TeacherListSearch />
      <TeacherList />
    </div>
  );
}
