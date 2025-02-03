import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Alim } from "../../../../components/root/Alim";
import { getQueryClient } from "../../../../utils/getQueryClient";

export default function AlimTableHome({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["acceptance", params.id, 1],
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Alim id={params.id} />
    </HydrationBoundary>
  );
}
