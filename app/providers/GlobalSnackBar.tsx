"use client";

import { createContext, useCallback, useContext, useState } from "react";

import GlobalSnackbar from "@/ui/Snackbar";
import { SnackbarType } from "@/ui/Snackbar/type";

interface SnackbarOptions {
  message: string;
  type?: SnackbarType;
  icon?: React.ReactNode;
  duration?: number;
}

interface SnackbarContextType {
  toast: (options: SnackbarOptions | string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);
export function GlobalSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [icon, setIcon] = useState<React.ReactNode>();
  const [duration, setDuration] = useState(1500);
  const [type, setType] = useState<SnackbarType | undefined>();

  const show = useCallback((opts: SnackbarOptions) => {
    setMessage(opts.message);
    setType(opts.type);
    setIcon(opts.icon);
    setDuration(opts.duration ?? 1500);
    setOpen(true);
  }, []);

  const toast = useCallback(
    (options: SnackbarOptions | string) => {
      if (typeof options === "string") {
        show({ message: options });
      } else {
        show(options);
      }
    },
    [show],
  );

  const success = (message: string) =>
    show({ message, type: "success", duration });

  const warning = (message: string) =>
    show({ message, type: "warning", duration });

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ toast, success, warning }}>
      {children}
      <GlobalSnackbar
        open={open}
        message={message}
        icon={icon}
        type={type}
        duration={duration}
        onClose={handleClose}
      />
    </SnackbarContext.Provider>
  );
}

export function useGlobalSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context)
    throw new Error(
      "useGlobalSnackbar must be used within GlobalSnackbarProvider",
    );
  return context;
}
