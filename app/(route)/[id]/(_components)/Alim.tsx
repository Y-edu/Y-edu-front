"use client";

import { Header } from "../../../ui";

import { AlimHeader } from "./AlimHeader";
import { AlimTable } from "./AlimTable";

export default function Alim({ matchingId }: { matchingId: number }) {
  return (
    <>
      <Header matchingId={matchingId} />
      <AlimHeader matchingId={matchingId} />
      <AlimTable matchingId={matchingId} />
    </>
  );
}
