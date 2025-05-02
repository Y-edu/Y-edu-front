import { useMutation } from "@tanstack/react-query";

import {
  putTeacherAvailable,
  putTeacherAvailableToken,
} from "@/actions/put-teacher-available";

export function useUpdateTeacherAvailable() {
  return useMutation({
    mutationFn: putTeacherAvailable,
  });
}

export function useUpdateTeacherAvailableWithToken() {
  return useMutation({
    mutationFn: ({
      token,
      available,
    }: {
      token: string;
      available: Record<string, string[]>;
    }) => putTeacherAvailableToken(token, available),
  });
}
