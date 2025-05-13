"use client";

import { Snackbar as MuiSnackbar, Box } from "@mui/material";

import { SnackbarIconMap } from "./type";

interface GlobalSnackbarProps {
  open: boolean;
  type?: "success" | "warning";
  icon?: React.ReactNode;
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
  type,
  icon,
  message,
  onClose,
  duration = 1500,
  anchor = { vertical: "top", horizontal: "center" },
}: GlobalSnackbarProps) {
  const toastIcon = type ? SnackbarIconMap[type] : null;

  return (
    <MuiSnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      anchorOrigin={anchor}
      sx={{
        top: "83% !important",
        left: "50% !important",
        transform: "translateX(-50%) !important",
        width: "max-content !important",
      }}
      message={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {toastIcon || icon}
          <Box component="span" sx={{ textAlign: "center", fontWeight: 600 }}>
            {message}
          </Box>
        </Box>
      }
      slotProps={{
        content: {
          sx: {
            borderRadius: "999px",
            padding: "6px 18px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#64748B",
          },
        },
      }}
    />
  );
}
