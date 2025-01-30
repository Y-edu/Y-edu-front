"use client";
import {
  MutationCache,
  QueryClient,
  matchQuery,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          // 일치하는 모든 태그를 한 번에 무효화, 그 외에는 무효화 X
          mutation.meta?.invalidates?.some((queryKey) =>
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            matchQuery({ queryKey }, query),
          ) ?? false,
      });
    },
  }),
});

export const QueryProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
