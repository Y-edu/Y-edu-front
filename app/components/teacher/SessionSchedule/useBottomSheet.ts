import { useCallback, useState } from "react";

type BottomSheetType = string | null;

export function useBottomSheet() {
  const [sheetType, setSheetType] = useState<BottomSheetType>(null);

  const openSheet = useCallback((type: string) => {
    setSheetType(type);
  }, []);

  const closeSheet = useCallback(() => {
    setSheetType(null);
  }, []);

  return {
    sheetType,
    isSheetOpen: sheetType !== null,
    openSheet,
    closeSheet,
  };
}
