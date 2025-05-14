import IconSuccess from "@/icons/IconSuccess";
import IconWarning from "@/icons/IconWarning";

export const SnackbarIconMap = {
  success: <IconSuccess />,
  warning: <IconWarning />,
} as const;

export type SnackbarType = keyof typeof SnackbarIconMap;
