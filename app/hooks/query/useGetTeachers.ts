import { useQuery } from "@tanstack/react-query";

import { getTeachers } from "../../actions/get-teachers";

interface UseGetTeachersProps {
  subject?: string[];
  school?: string[];
  gender?: string[];
}

export function useGetTeachers(filters: UseGetTeachersProps = {}) {
  return useQuery({
    queryKey: ["teachers", filters],
    queryFn: async () => {
      return getTeachers(filters);
    },
  });
}
