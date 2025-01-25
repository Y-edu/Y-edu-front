"use client";

import { useQuery } from "@tanstack/react-query";

import { getAcceptance } from "../../actions/get-acceptance";

export function useGetAcceptance(matchingId: number, page: number) {
  return useQuery({
    queryKey: ["acceptance", matchingId, page],
    queryFn: () => getAcceptance(matchingId),
  });
}
