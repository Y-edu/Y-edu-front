import { Header } from "../../../ui";

export default function MatchingDetailHome({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="flex flex-col">
      <Header matchingId={id} />
    </div>
  );
}
