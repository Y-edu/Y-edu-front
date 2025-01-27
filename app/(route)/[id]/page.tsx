import ParentsRequest from "../../components/root/ParentsRequest";
import TeacherList from "../../components/root/TeacherList";
import { Header } from "../../ui";

import { Alim } from "./(_components)/Alim";

export default function MatchingDetailHome({ id }: { id: string }) {
  // 페이지 네이션 처리 필요
  return (
    <div className="flex flex-col">
      <Header matchingId={id} />
      <Alim />
      <ParentsRequest />
      <TeacherList />
    </div>
  );
}
