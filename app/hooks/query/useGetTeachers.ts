import { useQuery } from "@tanstack/react-query";

import { getTeachers } from "../../actions/get-teachers";

export function useGetTeachers() {
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      const res = await getTeachers();
      const data = res;
      return data;
    },
  });
}
