import { Header } from "../../../../ui";
import { Alim } from "../../../../components/admin/Alim";
import ParentsRequest from "../../../../components/admin/ParentsRequest";
import { Teacher } from "../../../../components/admin/Teacher";

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
      <ParentsRequest applicationFormId={id} />
      <Teacher matchingId={id} />
    </div>
  );
}
