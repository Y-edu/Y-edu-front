"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getAcceptance } from "../../actions/get-acceptance";

export function useGetAcceptance(matchingId: number, page: number) {
  return useSuspenseQuery({
    queryKey: ["acceptance", matchingId, page],
    queryFn: () => getAcceptance(matchingId),
  });
}
