import {
  MutationCache,
  QueryClient,
  isServer,
  matchQuery,
} from "@tanstack/react-query";

function makeQueryClient() {
  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: {
        shouldDehydrateQuery: (query) => query.state.status === "pending",
      },
    },
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
  return queryClient;
}

export function getQueryClient() {
  let browserQueryClient: QueryClient | undefined;
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
