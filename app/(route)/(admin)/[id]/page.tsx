import { Header } from "../../../ui";
import { Alim } from "../../../components/root/Alim";
import ParentsRequest from "../../../components/root/ParentsRequest";
import { Teacher } from "../../../components/root/Teacher";

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
