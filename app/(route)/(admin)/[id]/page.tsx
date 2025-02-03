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
      <ParentsRequest />
      <Teacher matchingId={id} />
    </div>
  );
}
