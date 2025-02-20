import { regenerateAPI } from "@/actions/get-auth/get-regenerate";

export function useRegenerate() {
  const regenerate = async (): Promise<boolean> => {
    return regenerateAPI();
  };

  return { regenerate };
}
