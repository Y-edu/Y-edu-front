"use client";

import { useParams } from "next/navigation";

import { AlimTableProvider } from "../(hooks)/useAlimTable";

import { AlimHeader } from "./AlimHeader";
import { AlimTable } from "./AlimTable";

export function Alim() {
  const { id } = useParams<{ id: string }>();
  return (
    <section>
      <AlimTableProvider matchingId={String(id)} page={1}>
        <AlimHeader matchingId={String(id)} />
        <AlimTable />
      </AlimTableProvider>
    </section>
  );
}
