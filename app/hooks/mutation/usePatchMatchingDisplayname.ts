import { useMutation } from "@tanstack/react-query";
import { patchMatchingDisplayName } from "../../actions/patch-displayname";

export function usePatchMatchingDisplayName() {
  return useMutation({
    mutationFn: patchMatchingDisplayName,
  });
}
