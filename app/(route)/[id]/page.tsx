import { Header } from "../../ui";

import { AlimHeader } from "./(_components)/AlimHeader";
import { AlimTable } from "./(_components)/AlimTable";
import ParentsRequest from "./(_components)/ParentsRequest";
import TeacherList from "./(_components)/TeacherList";
import TeacherListFilter from "./(_components)/TeacherListFilter";
import TeacherListSearch from "./(_components)/TeacherListSearch";

export default function MatchingDetailHome({ id }: { id: number }) {
  return (
    <div>
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
