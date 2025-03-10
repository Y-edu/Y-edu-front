"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { getAcceptance } from "@/actions/get-acceptance";
import type { AcceptanceSchema } from "@/actions/get-acceptance";

export function useGetAcceptance(matchingId: string, page: number) {
  return useSuspenseQuery<AcceptanceSchema>({
    queryKey: [`/acceptance/${matchingId}/${page}`],
    queryFn: () => getAcceptance(matchingId),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
