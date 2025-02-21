import { useQuery } from "@tanstack/react-query";

import { getParentsList } from "app/actions/get-parents-list";

export function useGetParentsList() {
  return useQuery({
    queryKey: ["parents-list"],
    queryFn: () => getParentsList(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
}
