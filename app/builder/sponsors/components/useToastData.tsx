"use client";
import { useState, useRef, useCallback, useEffect } from "react";

// constants
import {
  DEFAULT_VARIANT,
  DEFAULT_TOAST_DURATION,
} from "./constants";

// types
import { ToastData } from "./types";

export const useToastData = () => {
  const [toastData, setToastData] = useState<ToastData[]>([]);

  const addToast = useCallback(
    ({
      message,
      variant = DEFAULT_VARIANT,
      duration = DEFAULT_TOAST_DURATION,
    }: Partial<ToastData> & { message: string }) => {
      setToastData((currentToastData) => [
        ...currentToastData.filter((toast) => toast.message !== message),
        {
          variant,
          message,
          duration,
          pending: duration,
        },
      ]);
    },
    [setToastData]
  );

  const deleteToast = useCallback(
    ({ message }: { message: string }) => {
      setToastData((currentToastData) =>
        currentToastData.filter((toast) => toast.message !== message)
      );
    },
    [setToastData]
  );

  return { toastData, addToast, deleteToast };
};
