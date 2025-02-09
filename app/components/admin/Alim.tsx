import { AlimTableProvider } from "../../(route)/(admin)/zuzuclubadmin/[id]/(hooks)/useAlimTable";

import { AlimHeader } from "./AlimHeader";
import { AlimTable } from "./AlimTable";

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
