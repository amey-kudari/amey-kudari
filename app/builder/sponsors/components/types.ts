import { TOAST_VARIANTS } from "./constants";

export type ToastData = {
  message: string;
  variant: TOAST_VARIANTS;
  duration: number;
  pending: number;
};
