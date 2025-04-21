"use client";

import { Snackbar as MuiSnackbar } from "@mui/material";

interface GlobalSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  anchor?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

export default function GlobalSnackbar({
  open,
  message,
  onClose,
  duration = 1500,
  anchor = { vertical: "top", horizontal: "center" },
}: GlobalSnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      message={message}
      anchorOrigin={anchor}
      sx={{ top: "80%", mx: "20px" }}
    />
  );
}
