import { Alim } from "../../../../components/root/Alim";

export default function AlimTableHome({
  params,
}: {
  params: {
    matchingId: string;
  };
}) {
  return <Alim id={params.matchingId} />;
}
