import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useRefreshQuery = (queryKeys?: Array<Array<QueryKey | undefined | Record<string, unknown>>>) => {
  const queryClient = useQueryClient();

  const refresh = useCallback(() => {
    queryKeys?.forEach((query) => {
      queryClient.invalidateQueries(query).catch(console.error);
    });
  }, [queryClient, queryKeys]);

  return { refresh, isFetching: queryClient.isFetching(queryKeys) !== 0 };
};
