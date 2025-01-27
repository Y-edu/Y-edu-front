import { Header } from "../../ui";

import { AlimHeader } from "./(_components)/AlimHeader";
import { AlimTable } from "./(_components)/AlimTable";

export default function MatchingDetailHome({ id }: { id: number }) {
  return (
    <div>
      <Header matchingId={id} />
      <AlimHeader matchingId={id} />
      <AlimTable matchingId={id} />
    </div>
  );
}
