"use client";

import { Snackbar as MuiSnackbar, Box } from "@mui/material";

interface GlobalSnackbarProps {
  open: boolean;
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
  icon,
  message,
  onClose,
  duration = 1800,
  anchor = { vertical: "top", horizontal: "center" },
}: GlobalSnackbarProps) {
  return (
    <MuiSnackbar
      open={open}
      onClose={onClose}
      autoHideDuration={duration}
      anchorOrigin={anchor}
      sx={{ top: "80%", mx: "20px" }}
      message={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {icon}
          <Box component="span" sx={{ flex: 1, textAlign: "center" }}>
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
          },
        },
      }}
    />
  );
}
