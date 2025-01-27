import { Header } from "../../ui";

import { Alim } from "./(_components)/Alim";

export default function MatchingDetailHome({ id }: { id: string }) {
  // 페이지 네이션 처리 필요
  return (
    <div>
      <Header matchingId={id} />
      <Alim />
    </div>
  );
}
