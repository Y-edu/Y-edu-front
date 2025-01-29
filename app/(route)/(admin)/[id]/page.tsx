import { Header } from "../../../ui";

import { Alim } from "./(_components)/Alim";
import ParentsRequest from "./(_components)/ParentsRequest";
import TeacherList from "./(_components)/TeacherList";
import TeacherListFilter from "./(_components)/TeacherListFilter";
import TeacherListSearch from "./(_components)/TeacherListSearch";

export default function MatchingDetailHome({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="flex flex-col">
      <Header matchingId={id} />
      <Alim id={id} />
      <ParentsRequest />
      <TeacherListFilter />
      <TeacherListSearch selectedTeachers={[]} />
      <TeacherList />
    </div>
  );
}
