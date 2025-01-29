import { Header } from "../../../ui";

import { Alim } from "./(Alim)/(_components)/Alim";
import ParentsRequest from "./ParentsRequest";
import { Teacher } from "./(Teacher)/(_components)/Teacher";

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
      <Teacher matchingId={id} />
    </div>
  );
}
