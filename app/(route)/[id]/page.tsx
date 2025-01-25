import { Header } from "../../ui";

import { AlimHeader } from "./(_components)/AlimHeader";

export default function MatchingDetailHome({ id }: { id: number }) {
  return (
    <div>
      <Header matchingId={id} />
      <AlimHeader matchingId={id} />
    </div>
  );
}
