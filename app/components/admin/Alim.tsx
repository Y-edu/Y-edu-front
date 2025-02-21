import { AlimHeader } from "./AlimHeader";
import { AlimTable } from "./AlimTable";

import { AlimTableProvider } from "app/(route)/(admin)/zuzuclubadmin/[id]/(hooks)/useAlimTable";

export function Alim({ id }: { id: string }) {
  return (
    <section>
      <AlimTableProvider matchingId={id} page={1}>
        <AlimHeader matchingId={id} />
        <AlimTable />
      </AlimTableProvider>
    </section>
  );
}
